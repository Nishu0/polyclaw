INSERT INTO users (id, wallet_address)
VALUES
  ('00000000-0000-0000-0000-000000000001', '0xabc123abc123abc123abc123abc123abc123abcd'),
  ('00000000-0000-0000-0000-000000000002', '0xdef123def123def123def123def123def123def0'),
  ('00000000-0000-0000-0000-000000000003', '0xaaa123aaa123aaa123aaa123aaa123aaa123aaaa'),
  ('00000000-0000-0000-0000-000000000004', '0xbbb123bbb123bbb123bbb123bbb123bbb123bbbb')
ON CONFLICT (wallet_address) DO NOTHING;

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
)
VALUES
  (
    '10000000-0000-0000-0000-000000000001',
    'Molt_Alpha',
    '0x4a11111111111111111111111111111111119f2b',
    'Arbitrage',
    'Cross-market mispricing and spread capture',
    'Aggressive',
    '4h 12m',
    '1.5x Max',
    ARRAY['Politics', 'Crypto'],
    1,
    true,
    true,
    NOW() - INTERVAL '2 minutes'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Delta_Force',
    '0x7c22222222222222222222222222222222222a11',
    'Market Making',
    'Tight spread liquidity with inventory hedging',
    'Moderate',
    '2h 40m',
    '1.2x Max',
    ARRAY['Politics'],
    2,
    false,
    true,
    NOW() - INTERVAL '5 minutes'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'Poly_Whale',
    '0x2d3333333333333333333333333333333333bb44',
    'Trend',
    'Momentum entries based on event velocity',
    'Moderate',
    '6h 10m',
    '1.0x Max',
    ARRAY['Crypto', 'Macro'],
    3,
    true,
    false,
    NOW() - INTERVAL '1 hour'
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Scalp_Master',
    '0x8a444444444444444444444444444444444433cc',
    'Scalping',
    'Short-duration microstructure scalps',
    'Aggressive',
    '55m',
    '2x Max',
    ARRAY['Sports', 'Politics'],
    4,
    false,
    true,
    NOW() - INTERVAL '12 minutes'
  )
ON CONFLICT (wallet_address) DO NOTHING;

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
  equity_usd
)
VALUES
  ('10000000-0000-0000-0000-000000000001', 12.4, 45.2, 12450.00, 2.1, 452, 78.0, 890000.00, 'Politics', 124592.44),
  ('10000000-0000-0000-0000-000000000002', -5.2, 32.8, 8920.00, 8.4, 1205, 55.0, 620000.00, 'Politics', 102300.50),
  ('10000000-0000-0000-0000-000000000003', 2.1, 18.5, 4100.00, 4.2, 89, 62.0, 150000.00, 'Crypto', 80410.10),
  ('10000000-0000-0000-0000-000000000004', 8.9, 15.2, 3250.00, 3.7, 612, 69.0, 410000.00, 'Sports', 98110.00)
ON CONFLICT (bot_id) DO UPDATE SET
  return_7d_pct = EXCLUDED.return_7d_pct,
  return_30d_pct = EXCLUDED.return_30d_pct,
  pnl_30d_usd = EXCLUDED.pnl_30d_usd,
  max_drawdown_pct = EXCLUDED.max_drawdown_pct,
  total_trades = EXCLUDED.total_trades,
  win_rate_pct = EXCLUDED.win_rate_pct,
  volume_24h_usd = EXCLUDED.volume_24h_usd,
  best_category = EXCLUDED.best_category,
  equity_usd = EXCLUDED.equity_usd,
  updated_at = NOW();

INSERT INTO bot_positions (
  bot_id,
  market,
  side,
  entry_price,
  current_price,
  size_usd,
  unrealized_pnl_usd,
  is_open,
  opened_at
)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Trump vs Biden 2024', 'LONG', 0.42, 0.45, 5000, 340.50, true, NOW() - INTERVAL '8 hours'),
  ('10000000-0000-0000-0000-000000000001', 'BTC > $100k by Dec', 'SHORT', 0.12, 0.10, 2400, 80.20, true, NOW() - INTERVAL '4 hours'),
  ('10000000-0000-0000-0000-000000000001', 'Fed Rate Cut in June', 'LONG', 0.65, 0.61, 10000, -400.00, true, NOW() - INTERVAL '3 hours')
ON CONFLICT DO NOTHING;

INSERT INTO watchlist_entries (user_id, bot_id)
VALUES
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004')
ON CONFLICT DO NOTHING;

INSERT INTO alerts (
  user_id,
  bot_id,
  alert_type,
  severity,
  title,
  message,
  is_read,
  created_at
)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'take_profit',
    'info',
    'Alpha Centauri hit Take Profit',
    'Position closed at $0.85 (+12% gain)',
    false,
    NOW() - INTERVAL '2 minutes'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000002',
    'drawdown_warning',
    'warning',
    'Delta Arbitrage Drawdown Warning',
    'Drawdown exceeded 5% threshold on Market ID 4920',
    false,
    NOW() - INTERVAL '15 minutes'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    NULL,
    'daily_summary',
    'info',
    'Daily Summary Report',
    'Your daily trading summary is ready to view.',
    true,
    NOW() - INTERVAL '4 hours'
  )
ON CONFLICT DO NOTHING;
