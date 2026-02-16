import type pg from "pg";
import type { LeaderboardBot, LeaderboardStats, Side } from "../types.js";

interface LeaderboardFilters {
  timeframe: "7d" | "30d";
  category?: string;
  verifiedOnly?: boolean;
  minTrades?: number;
  maxDrawdownPct?: number;
  limit: number;
  offset: number;
  sortBy: "return7d" | "return30d" | "pnl30d" | "winRate" | "trades";
}

const SORT_SQL: Record<LeaderboardFilters["sortBy"], string> = {
  return7d: "return_7d_pct DESC",
  return30d: "return_30d_pct DESC",
  pnl30d: "pnl_30d_usd DESC",
  winRate: "win_rate_pct DESC",
  trades: "total_trades DESC",
};

export async function findOrCreateUser(
  db: pg.Pool,
  walletAddress: string,
): Promise<{ id: string; walletAddress: string }> {
  const normalized = walletAddress.toLowerCase();

  const existing = await db.query<{ id: string; wallet_address: string }>(
    `SELECT id, wallet_address FROM users WHERE wallet_address = $1`,
    [normalized],
  );

  if (existing.rowCount && existing.rows[0]) {
    return {
      id: existing.rows[0].id,
      walletAddress: existing.rows[0].wallet_address,
    };
  }

  const created = await db.query<{ id: string; wallet_address: string }>(
    `INSERT INTO users (wallet_address) VALUES ($1) RETURNING id, wallet_address`,
    [normalized],
  );
  const createdRow = created.rows[0];
  if (!createdRow) {
    throw new Error("Failed to create user");
  }

  return {
    id: createdRow.id,
    walletAddress: createdRow.wallet_address,
  };
}

export async function getLeaderboard(
  db: pg.Pool,
  filters: LeaderboardFilters,
): Promise<{ rows: LeaderboardBot[]; total: number }> {
  const values: unknown[] = [];
  const where: string[] = [];

  if (filters.category) {
    values.push(filters.category);
    where.push(`b.strategy = $${values.length}`);
  }

  if (filters.verifiedOnly) {
    where.push(`b.is_verified = true`);
  }

  if (typeof filters.minTrades === "number") {
    values.push(filters.minTrades);
    where.push(`p.total_trades >= $${values.length}`);
  }

  if (typeof filters.maxDrawdownPct === "number") {
    values.push(filters.maxDrawdownPct);
    where.push(`p.max_drawdown_pct <= $${values.length}`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const orderSql = SORT_SQL[filters.sortBy];

  values.push(filters.limit, filters.offset);
  const limitArg = `$${values.length - 1}`;
  const offsetArg = `$${values.length}`;

  const query = `
    WITH ranked AS (
      SELECT
        b.id,
        b.name,
        b.wallet_address,
        b.strategy,
        b.is_verified,
        b.is_active,
        b.updated_at,
        p.return_7d_pct,
        p.return_30d_pct,
        p.pnl_30d_usd,
        p.max_drawdown_pct,
        p.total_trades,
        p.win_rate_pct
      FROM bots b
      JOIN bot_performance_latest p ON p.bot_id = b.id
      ${whereSql}
    )
    SELECT
      id,
      name,
      wallet_address,
      strategy,
      is_verified,
      is_active,
      updated_at,
      return_7d_pct,
      return_30d_pct,
      pnl_30d_usd,
      max_drawdown_pct,
      total_trades,
      win_rate_pct,
      ROW_NUMBER() OVER (ORDER BY ${orderSql}) as rank,
      COUNT(*) OVER() as total_count
    FROM ranked
    ORDER BY ${orderSql}
    LIMIT ${limitArg}
    OFFSET ${offsetArg}
  `;

  const result = await db.query<{
    id: string;
    name: string;
    wallet_address: string;
    strategy: string;
    is_verified: boolean;
    is_active: boolean;
    updated_at: string;
    return_7d_pct: string;
    return_30d_pct: string;
    pnl_30d_usd: string;
    max_drawdown_pct: string;
    total_trades: number;
    win_rate_pct: string;
    rank: number;
    total_count: string;
  }>(query, values);

  return {
    rows: result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      address: row.wallet_address,
      strategy: row.strategy,
      rank: row.rank,
      verified: row.is_verified,
      active: row.is_active,
      return7d: Number(row.return_7d_pct),
      return30d: Number(row.return_30d_pct),
      pnl30dUsd: Number(row.pnl_30d_usd),
      maxDrawdownPct: Number(row.max_drawdown_pct),
      totalTrades: row.total_trades,
      winRatePct: Number(row.win_rate_pct),
      lastActiveAt: row.updated_at,
    })),
    total: result.rows[0] ? Number(result.rows[0].total_count) : 0,
  };
}

export async function getLeaderboardStats(db: pg.Pool): Promise<LeaderboardStats> {
  const totals = await db.query<{
    total_bots: string;
    volume_24h_usd: string;
    avg_30d_return_pct: string;
  }>(`
    SELECT
      COUNT(*)::text as total_bots,
      COALESCE(SUM(p.volume_24h_usd), 0)::text as volume_24h_usd,
      COALESCE(AVG(p.return_30d_pct), 0)::text as avg_30d_return_pct
    FROM bots b
    JOIN bot_performance_latest p ON p.bot_id = b.id
  `);

  const top = await db.query<{ bot_id: string; name: string; return_30d_pct: string }>(`
    SELECT b.id as bot_id, b.name, p.return_30d_pct
    FROM bots b
    JOIN bot_performance_latest p ON p.bot_id = b.id
    ORDER BY p.return_30d_pct DESC
    LIMIT 1
  `);

  return {
    totalBots: Number(totals.rows[0]?.total_bots ?? 0),
    volume24hUsd: Number(totals.rows[0]?.volume_24h_usd ?? 0),
    avg30dReturnPct: Number(totals.rows[0]?.avg_30d_return_pct ?? 0),
    topPerformer: top.rows[0]
      ? {
          botId: top.rows[0].bot_id,
          name: top.rows[0].name,
          return30d: Number(top.rows[0].return_30d_pct),
        }
      : null,
  };
}

export async function getBotDetails(db: pg.Pool, botId: string) {
  const result = await db.query<{
    id: string;
    name: string;
    wallet_address: string;
    strategy: string;
    is_verified: boolean;
    is_active: boolean;
    rank: number;
    logic: string;
    risk_style: string;
    avg_hold: string;
    leverage: string;
    markets: string[];
    return_7d_pct: string;
    return_30d_pct: string;
    pnl_30d_usd: string;
    max_drawdown_pct: string;
    total_trades: number;
    win_rate_pct: string;
    best_category: string;
    equity_usd: string;
  }>(
    `
    SELECT
      b.id,
      b.name,
      b.wallet_address,
      b.strategy,
      b.is_verified,
      b.is_active,
      b.rank,
      b.logic,
      b.risk_style,
      b.avg_hold,
      b.leverage,
      b.markets,
      p.return_7d_pct,
      p.return_30d_pct,
      p.pnl_30d_usd,
      p.max_drawdown_pct,
      p.total_trades,
      p.win_rate_pct,
      p.best_category,
      p.equity_usd
    FROM bots b
    JOIN bot_performance_latest p ON p.bot_id = b.id
    WHERE b.id = $1
  `,
    [botId],
  );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    address: row.wallet_address,
    strategy: row.strategy,
    verified: row.is_verified,
    active: row.is_active,
    rank: row.rank,
    strategyInfo: {
      logic: row.logic,
      riskStyle: row.risk_style,
      avgHold: row.avg_hold,
      leverage: row.leverage,
      markets: row.markets,
      winRatePct: Number(row.win_rate_pct),
    },
    performance: {
      return7d: Number(row.return_7d_pct),
      return30d: Number(row.return_30d_pct),
      pnl30dUsd: Number(row.pnl_30d_usd),
      maxDrawdownPct: Number(row.max_drawdown_pct),
      totalTrades: row.total_trades,
      bestCategory: row.best_category,
      equityUsd: Number(row.equity_usd),
    },
  };
}

export async function getBotPositions(db: pg.Pool, botId: string, onlyOpen: boolean) {
  const where = onlyOpen ? "WHERE bot_id = $1 AND is_open = true" : "WHERE bot_id = $1";
  const result = await db.query<{
    id: number;
    market: string;
    side: Side;
    entry_price: string;
    current_price: string;
    size_usd: string;
    unrealized_pnl_usd: string;
    is_open: boolean;
    opened_at: string;
  }>(
    `
    SELECT id, market, side, entry_price, current_price, size_usd, unrealized_pnl_usd, is_open, opened_at
    FROM bot_positions
    ${where}
    ORDER BY opened_at DESC
  `,
    [botId],
  );

  return result.rows.map((row) => ({
    id: row.id,
    market: row.market,
    side: row.side,
    entryPrice: Number(row.entry_price),
    currentPrice: Number(row.current_price),
    sizeUsd: Number(row.size_usd),
    unrealizedPnlUsd: Number(row.unrealized_pnl_usd),
    isOpen: row.is_open,
    openedAt: row.opened_at,
  }));
}

export async function getWatchlistSummary(db: pg.Pool, userId: string) {
  const result = await db.query<{
    active_bots: string;
    total_pnl_30d_usd: string;
    avg_return_30d_pct: string;
    avg_win_rate_pct: string;
    total_volume_usd: string;
  }>(
    `
    SELECT
      COUNT(*) FILTER (WHERE b.is_active = true)::text as active_bots,
      COALESCE(SUM(p.pnl_30d_usd), 0)::text as total_pnl_30d_usd,
      COALESCE(AVG(p.return_30d_pct), 0)::text as avg_return_30d_pct,
      COALESCE(AVG(p.win_rate_pct), 0)::text as avg_win_rate_pct,
      COALESCE(SUM(p.volume_24h_usd), 0)::text as total_volume_usd
    FROM watchlist_entries w
    JOIN bots b ON b.id = w.bot_id
    JOIN bot_performance_latest p ON p.bot_id = b.id
    WHERE w.user_id = $1
  `,
    [userId],
  );

  const row = result.rows[0];
  return {
    activeBots: Number(row?.active_bots ?? 0),
    totalPnl30dUsd: Number(row?.total_pnl_30d_usd ?? 0),
    avgReturn30dPct: Number(row?.avg_return_30d_pct ?? 0),
    avgWinRatePct: Number(row?.avg_win_rate_pct ?? 0),
    totalVolumeUsd: Number(row?.total_volume_usd ?? 0),
  };
}

export async function getWatchlistBots(db: pg.Pool, userId: string) {
  const result = await db.query<{
    bot_id: string;
    name: string;
    wallet_address: string;
    strategy: string;
    return_7d_pct: string;
    return_30d_pct: string;
    pnl_30d_usd: string;
    max_drawdown_pct: string;
    updated_at: string;
  }>(
    `
    SELECT
      b.id as bot_id,
      b.name,
      b.wallet_address,
      b.strategy,
      p.return_7d_pct,
      p.return_30d_pct,
      p.pnl_30d_usd,
      p.max_drawdown_pct,
      b.updated_at
    FROM watchlist_entries w
    JOIN bots b ON b.id = w.bot_id
    JOIN bot_performance_latest p ON p.bot_id = b.id
    WHERE w.user_id = $1
    ORDER BY p.return_30d_pct DESC
  `,
    [userId],
  );

  return result.rows.map((row) => ({
    botId: row.bot_id,
    name: row.name,
    address: row.wallet_address,
    strategy: row.strategy,
    return7d: Number(row.return_7d_pct),
    return30d: Number(row.return_30d_pct),
    pnl30dUsd: Number(row.pnl_30d_usd),
    maxDrawdownPct: Number(row.max_drawdown_pct),
    lastActiveAt: row.updated_at,
  }));
}

export async function addToWatchlist(db: pg.Pool, userId: string, botId: string) {
  await db.query(
    `
    INSERT INTO watchlist_entries (user_id, bot_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, bot_id) DO NOTHING
  `,
    [userId, botId],
  );
}

export async function removeFromWatchlist(db: pg.Pool, userId: string, botId: string) {
  await db.query(`DELETE FROM watchlist_entries WHERE user_id = $1 AND bot_id = $2`, [
    userId,
    botId,
  ]);
}

export async function getAlerts(db: pg.Pool, userId: string, limit: number) {
  const result = await db.query<{
    id: string;
    alert_type: string;
    severity: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
    bot_name: string | null;
  }>(
    `
    SELECT
      a.id,
      a.alert_type,
      a.severity,
      a.title,
      a.message,
      a.is_read,
      a.created_at,
      b.name as bot_name
    FROM alerts a
    LEFT JOIN bots b ON b.id = a.bot_id
    WHERE a.user_id = $1
    ORDER BY a.created_at DESC
    LIMIT $2
  `,
    [userId, limit],
  );

  return result.rows.map((row) => ({
    id: row.id,
    type: row.alert_type,
    severity: row.severity,
    title: row.title,
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at,
    botName: row.bot_name,
  }));
}

export async function markAlertRead(db: pg.Pool, userId: string, alertId: string) {
  const result = await db.query(
    `UPDATE alerts SET is_read = true WHERE id = $1 AND user_id = $2`,
    [alertId, userId],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function createCopyTradeRequest(
  db: pg.Pool,
  params: {
    userId: string;
    sourceBotId: string;
    targetWalletAddress: string;
    marketSlug: string;
    side: Side;
    amountUsd: number;
    maxSlippageBps?: number;
  },
) {
  const source = await db.query<{ wallet_address: string }>(
    `SELECT wallet_address FROM bots WHERE id = $1`,
    [params.sourceBotId],
  );

  if (!source.rows[0]) {
    throw new Error("Bot not found");
  }

  const insert = await db.query<{
    id: string;
    status: string;
    created_at: string;
  }>(
    `
    INSERT INTO copy_trade_requests (
      user_id,
      source_bot_id,
      source_wallet_address,
      target_wallet_address,
      market_slug,
      side,
      amount_usd,
      max_slippage_bps,
      status,
      metadata
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'QUEUED',$9)
    RETURNING id, status, created_at
  `,
    [
      params.userId,
      params.sourceBotId,
      source.rows[0].wallet_address,
      params.targetWalletAddress.toLowerCase(),
      params.marketSlug,
      params.side,
      params.amountUsd,
      params.maxSlippageBps ?? 100,
      JSON.stringify({ trigger: "manual_api" }),
    ],
  );

  const inserted = insert.rows[0];
  if (!inserted) {
    throw new Error("Failed to create copy trade request");
  }

  return inserted;
}
