import type pg from "pg";
import type { Trade } from "@polymarket/clob-client";
import type { WalletPerformance } from "./polymarket.js";

export async function upsertTrackedWallet(db: pg.Pool, address: string, source = "manual") {
  await db.query(
    `
    INSERT INTO tracked_wallets (address, source, last_synced_at)
    VALUES ($1, $2, NOW())
    ON CONFLICT (address)
    DO UPDATE SET source = EXCLUDED.source, last_synced_at = NOW()
  `,
    [address.toLowerCase(), source],
  );
}

export async function upsertWalletTrades(db: pg.Pool, walletAddress: string, trades: Trade[]) {
  if (trades.length === 0) {
    return;
  }

  for (const trade of trades) {
    const size = Number(trade.size);
    const price = Number(trade.price);
    const notionalUsd = Number.isFinite(size) && Number.isFinite(price) ? size * price : 0;

    await db.query(
      `
      INSERT INTO wallet_trades (
        id,
        wallet_address,
        market,
        asset_id,
        side,
        size,
        price,
        notional_usd,
        outcome,
        trader_side,
        match_time,
        transaction_hash,
        raw
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      ON CONFLICT (id)
      DO UPDATE SET
        price = EXCLUDED.price,
        size = EXCLUDED.size,
        notional_usd = EXCLUDED.notional_usd,
        raw = EXCLUDED.raw
    `,
      [
        trade.id,
        walletAddress.toLowerCase(),
        trade.market,
        trade.asset_id,
        trade.side,
        size,
        price,
        notionalUsd,
        trade.outcome,
        trade.trader_side,
        trade.match_time,
        trade.transaction_hash,
        JSON.stringify(trade),
      ],
    );
  }
}

export async function upsertWalletPerformance(db: pg.Pool, performance: WalletPerformance) {
  await db.query(
    `
    INSERT INTO wallet_performance_latest (
      wallet_address,
      trade_count_30d,
      volume_usd_30d,
      pnl_estimate_usd_30d,
      return_estimate_pct_30d,
      win_rate_estimate_pct_30d,
      last_trade_at,
      updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
    ON CONFLICT (wallet_address)
    DO UPDATE SET
      trade_count_30d = EXCLUDED.trade_count_30d,
      volume_usd_30d = EXCLUDED.volume_usd_30d,
      pnl_estimate_usd_30d = EXCLUDED.pnl_estimate_usd_30d,
      return_estimate_pct_30d = EXCLUDED.return_estimate_pct_30d,
      win_rate_estimate_pct_30d = EXCLUDED.win_rate_estimate_pct_30d,
      last_trade_at = EXCLUDED.last_trade_at,
      updated_at = NOW()
  `,
    [
      performance.walletAddress,
      performance.tradeCount30d,
      performance.volumeUsd30d,
      performance.pnlEstimateUsd30d,
      performance.returnEstimatePct30d,
      performance.winRateEstimatePct30d,
      performance.lastTradeAt,
    ],
  );
}

export async function upsertBotPerformanceFromWallet(
  db: pg.Pool,
  performance: WalletPerformance,
) {
  const shortAddress = `${performance.walletAddress.slice(0, 6)}...${performance.walletAddress.slice(-4)}`;

  await db.query(
    `
    INSERT INTO bots (
      id,
      name,
      wallet_address,
      strategy,
      logic,
      risk_style,
      avg_hold,
      leverage,
      markets,
      rank,
      is_verified,
      is_active,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      $1,
      $2,
      'On-chain copy',
      'Synced from Polymarket CLOB public trades',
      'Unknown',
      'Unknown',
      '1x',
      ARRAY['Polymarket'],
      0,
      false,
      true,
      NOW()
    )
    ON CONFLICT (wallet_address)
    DO UPDATE SET updated_at = NOW(), is_active = true
  `,
    [shortAddress, performance.walletAddress],
  );

  await db.query(
    `
    INSERT INTO bot_performance_latest (
      bot_id,
      return_7d_pct,
      return_30d_pct,
      pnl_30d_usd,
      max_drawdown_pct,
      total_trades,
      win_rate_pct,
      volume_24h_usd,
      best_category,
      equity_usd,
      updated_at
    )
    SELECT
      b.id,
      0,
      $1,
      $2,
      0,
      $3,
      $4,
      LEAST($5, 1000000000),
      'Polymarket',
      0,
      NOW()
    FROM bots b
    WHERE b.wallet_address = $6
    ON CONFLICT (bot_id)
    DO UPDATE SET
      return_30d_pct = EXCLUDED.return_30d_pct,
      pnl_30d_usd = EXCLUDED.pnl_30d_usd,
      total_trades = EXCLUDED.total_trades,
      win_rate_pct = EXCLUDED.win_rate_pct,
      volume_24h_usd = EXCLUDED.volume_24h_usd,
      updated_at = NOW()
  `,
    [
      performance.returnEstimatePct30d,
      performance.pnlEstimateUsd30d,
      performance.tradeCount30d,
      performance.winRateEstimatePct30d,
      performance.volumeUsd30d,
      performance.walletAddress,
    ],
  );
}

export async function getLiveTrackedPerformance(db: pg.Pool, limit: number) {
  const result = await db.query<{
    wallet_address: string;
    trade_count_30d: number;
    volume_usd_30d: string;
    pnl_estimate_usd_30d: string;
    return_estimate_pct_30d: string;
    win_rate_estimate_pct_30d: string;
    last_trade_at: string | null;
  }>(
    `
    SELECT
      wallet_address,
      trade_count_30d,
      volume_usd_30d,
      pnl_estimate_usd_30d,
      return_estimate_pct_30d,
      win_rate_estimate_pct_30d,
      last_trade_at
    FROM wallet_performance_latest
    ORDER BY return_estimate_pct_30d DESC
    LIMIT $1
  `,
    [limit],
  );

  return result.rows.map((row, index) => ({
    rank: index + 1,
    walletAddress: row.wallet_address,
    tradeCount30d: row.trade_count_30d,
    volumeUsd30d: Number(row.volume_usd_30d),
    pnlEstimateUsd30d: Number(row.pnl_estimate_usd_30d),
    returnEstimatePct30d: Number(row.return_estimate_pct_30d),
    winRateEstimatePct30d: Number(row.win_rate_estimate_pct_30d),
    lastTradeAt: row.last_trade_at,
  }));
}

export async function upsertTelegramUser(
  db: pg.Pool,
  params: {
    telegramUserId: number;
    username?: string;
    eoaAddress?: string;
    polymarketSafeAddress?: string;
    isSafeDeployed?: boolean;
  },
) {
  const result = await db.query<{
    telegram_user_id: string;
    username: string | null;
    eoa_address: string | null;
    polymarket_safe_address: string | null;
    is_safe_deployed: boolean;
  }>(
    `
    INSERT INTO telegram_users (
      telegram_user_id,
      username,
      eoa_address,
      polymarket_safe_address,
      is_safe_deployed,
      updated_at
    ) VALUES ($1,$2,$3,$4,$5,NOW())
    ON CONFLICT (telegram_user_id)
    DO UPDATE SET
      username = COALESCE(EXCLUDED.username, telegram_users.username),
      eoa_address = COALESCE(EXCLUDED.eoa_address, telegram_users.eoa_address),
      polymarket_safe_address = COALESCE(EXCLUDED.polymarket_safe_address, telegram_users.polymarket_safe_address),
      is_safe_deployed = COALESCE(EXCLUDED.is_safe_deployed, telegram_users.is_safe_deployed),
      updated_at = NOW()
    RETURNING telegram_user_id, username, eoa_address, polymarket_safe_address, is_safe_deployed
  `,
    [
      params.telegramUserId,
      params.username ?? null,
      params.eoaAddress?.toLowerCase() ?? null,
      params.polymarketSafeAddress?.toLowerCase() ?? null,
      params.isSafeDeployed ?? false,
    ],
  );

  return result.rows[0] ?? null;
}

export async function getTelegramUser(db: pg.Pool, telegramUserId: number) {
  const result = await db.query<{
    telegram_user_id: string;
    username: string | null;
    eoa_address: string | null;
    polymarket_safe_address: string | null;
    is_safe_deployed: boolean;
  }>(
    `
    SELECT telegram_user_id, username, eoa_address, polymarket_safe_address, is_safe_deployed
    FROM telegram_users
    WHERE telegram_user_id = $1
  `,
    [telegramUserId],
  );

  return result.rows[0] ?? null;
}
