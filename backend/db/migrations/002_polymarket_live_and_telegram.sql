CREATE TABLE IF NOT EXISTS tracked_wallets (
  address TEXT PRIMARY KEY,
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS wallet_trades (
  id TEXT PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  market TEXT NOT NULL,
  asset_id TEXT NOT NULL,
  side TEXT NOT NULL,
  size NUMERIC(30, 10) NOT NULL,
  price NUMERIC(30, 10) NOT NULL,
  notional_usd NUMERIC(30, 10) NOT NULL,
  outcome TEXT,
  trader_side TEXT,
  match_time TIMESTAMPTZ NOT NULL,
  transaction_hash TEXT,
  raw JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wallet_trades_wallet_match_time
  ON wallet_trades(wallet_address, match_time DESC);

CREATE TABLE IF NOT EXISTS wallet_performance_latest (
  wallet_address TEXT PRIMARY KEY,
  trade_count_30d INTEGER NOT NULL,
  volume_usd_30d NUMERIC(30, 10) NOT NULL,
  pnl_estimate_usd_30d NUMERIC(30, 10) NOT NULL,
  return_estimate_pct_30d NUMERIC(20, 8) NOT NULL,
  win_rate_estimate_pct_30d NUMERIC(20, 8) NOT NULL,
  last_trade_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS telegram_users (
  telegram_user_id BIGINT PRIMARY KEY,
  username TEXT,
  eoa_address TEXT,
  polymarket_safe_address TEXT,
  is_safe_deployed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_telegram_users_eoa_address
  ON telegram_users(eoa_address);
