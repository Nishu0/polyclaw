CREATE OR REPLACE FUNCTION app_uuid() RETURNS UUID AS $$
  SELECT (
    SUBSTRING(md5(random()::text || clock_timestamp()::text), 1, 8) || '-' ||
    SUBSTRING(md5(random()::text || clock_timestamp()::text), 1, 4) || '-' ||
    '4' || SUBSTRING(md5(random()::text || clock_timestamp()::text), 1, 3) || '-' ||
    SUBSTRING('89ab', (floor(random() * 4)::int + 1), 1) ||
      SUBSTRING(md5(random()::text || clock_timestamp()::text), 1, 3) || '-' ||
    SUBSTRING(md5(random()::text || clock_timestamp()::text), 1, 12)
  )::uuid;
$$ LANGUAGE SQL VOLATILE;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT app_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bots (
  id UUID PRIMARY KEY DEFAULT app_uuid(),
  name TEXT NOT NULL,
  wallet_address TEXT UNIQUE NOT NULL,
  strategy TEXT NOT NULL,
  logic TEXT NOT NULL DEFAULT '',
  risk_style TEXT NOT NULL DEFAULT 'Moderate',
  avg_hold TEXT NOT NULL DEFAULT '0h',
  leverage TEXT NOT NULL DEFAULT '1x',
  markets TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  rank INTEGER NOT NULL DEFAULT 0,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bot_performance_latest (
  bot_id UUID PRIMARY KEY REFERENCES bots(id) ON DELETE CASCADE,
  return_7d_pct NUMERIC(10, 4) NOT NULL DEFAULT 0,
  return_30d_pct NUMERIC(10, 4) NOT NULL DEFAULT 0,
  pnl_30d_usd NUMERIC(16, 2) NOT NULL DEFAULT 0,
  max_drawdown_pct NUMERIC(10, 4) NOT NULL DEFAULT 0,
  total_trades INTEGER NOT NULL DEFAULT 0,
  win_rate_pct NUMERIC(10, 4) NOT NULL DEFAULT 0,
  volume_24h_usd NUMERIC(16, 2) NOT NULL DEFAULT 0,
  best_category TEXT NOT NULL DEFAULT 'N/A',
  equity_usd NUMERIC(16, 2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bot_positions (
  id BIGSERIAL PRIMARY KEY,
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  market TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('LONG', 'SHORT')),
  entry_price NUMERIC(10, 4) NOT NULL,
  current_price NUMERIC(10, 4) NOT NULL,
  size_usd NUMERIC(16, 2) NOT NULL,
  unrealized_pnl_usd NUMERIC(16, 2) NOT NULL,
  is_open BOOLEAN NOT NULL DEFAULT true,
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS watchlist_entries (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  alerts_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, bot_id)
);

CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT app_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bot_id UUID REFERENCES bots(id) ON DELETE SET NULL,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS copy_trade_requests (
  id UUID PRIMARY KEY DEFAULT app_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_bot_id UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  source_wallet_address TEXT NOT NULL,
  target_wallet_address TEXT NOT NULL,
  market_slug TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('LONG', 'SHORT')),
  amount_usd NUMERIC(16, 2) NOT NULL,
  max_slippage_bps INTEGER NOT NULL DEFAULT 100,
  status TEXT NOT NULL CHECK (status IN ('QUEUED', 'SUBMITTED', 'FILLED', 'FAILED')),
  metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  executed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_bots_strategy ON bots(strategy);
CREATE INDEX IF NOT EXISTS idx_bot_performance_return_30d ON bot_performance_latest(return_30d_pct DESC);
CREATE INDEX IF NOT EXISTS idx_watchlist_user ON watchlist_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user_created ON alerts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_copy_trade_status ON copy_trade_requests(status, created_at DESC);
