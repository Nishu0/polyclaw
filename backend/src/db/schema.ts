import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  check,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`app_uuid()`),
  walletAddress: text("wallet_address").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bots = pgTable(
  "bots",
  {
    id: uuid("id").primaryKey().default(sql`app_uuid()`),
    name: text("name").notNull(),
    walletAddress: text("wallet_address").notNull().unique(),
    strategy: text("strategy").notNull(),
    logic: text("logic").notNull().default(""),
    riskStyle: text("risk_style").notNull().default("Moderate"),
    avgHold: text("avg_hold").notNull().default("0h"),
    leverage: text("leverage").notNull().default("1x"),
    markets: text("markets").array().notNull().default(sql`ARRAY[]::TEXT[]`),
    rank: integer("rank").notNull().default(0),
    isVerified: boolean("is_verified").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("idx_bots_strategy").on(table.strategy)],
);

export const botPerformanceLatest = pgTable(
  "bot_performance_latest",
  {
    botId: uuid("bot_id")
      .primaryKey()
      .references(() => bots.id, { onDelete: "cascade" }),
    return7dPct: numeric("return_7d_pct", { precision: 10, scale: 4 }).notNull().default("0"),
    return30dPct: numeric("return_30d_pct", { precision: 10, scale: 4 }).notNull().default("0"),
    pnl30dUsd: numeric("pnl_30d_usd", { precision: 16, scale: 2 }).notNull().default("0"),
    maxDrawdownPct: numeric("max_drawdown_pct", { precision: 10, scale: 4 }).notNull().default("0"),
    totalTrades: integer("total_trades").notNull().default(0),
    winRatePct: numeric("win_rate_pct", { precision: 10, scale: 4 }).notNull().default("0"),
    volume24hUsd: numeric("volume_24h_usd", { precision: 16, scale: 2 }).notNull().default("0"),
    bestCategory: text("best_category").notNull().default("N/A"),
    equityUsd: numeric("equity_usd", { precision: 16, scale: 2 }).notNull().default("0"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("idx_bot_performance_return_30d").on(table.return30dPct)],
);

export const botPositions = pgTable(
  "bot_positions",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    botId: uuid("bot_id")
      .notNull()
      .references(() => bots.id, { onDelete: "cascade" }),
    market: text("market").notNull(),
    side: text("side").notNull(),
    entryPrice: numeric("entry_price", { precision: 10, scale: 4 }).notNull(),
    currentPrice: numeric("current_price", { precision: 10, scale: 4 }).notNull(),
    sizeUsd: numeric("size_usd", { precision: 16, scale: 2 }).notNull(),
    unrealizedPnlUsd: numeric("unrealized_pnl_usd", { precision: 16, scale: 2 }).notNull(),
    isOpen: boolean("is_open").notNull().default(true),
    openedAt: timestamp("opened_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [check("bot_positions_side_check", sql`${table.side} IN ('LONG', 'SHORT')`)],
);

export const watchlistEntries = pgTable(
  "watchlist_entries",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    botId: uuid("bot_id")
      .notNull()
      .references(() => bots.id, { onDelete: "cascade" }),
    alertsEnabled: boolean("alerts_enabled").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.botId] }),
    index("idx_watchlist_user").on(table.userId),
  ],
);

export const alerts = pgTable(
  "alerts",
  {
    id: uuid("id").primaryKey().default(sql`app_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    botId: uuid("bot_id").references(() => bots.id, { onDelete: "set null" }),
    alertType: text("alert_type").notNull(),
    severity: text("severity").notNull(),
    title: text("title").notNull(),
    message: text("message").notNull(),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check("alerts_severity_check", sql`${table.severity} IN ('info', 'warning', 'critical')`),
    index("idx_alerts_user_created").on(table.userId, table.createdAt),
  ],
);

export const copyTradeRequests = pgTable(
  "copy_trade_requests",
  {
    id: uuid("id").primaryKey().default(sql`app_uuid()`),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    sourceBotId: uuid("source_bot_id")
      .notNull()
      .references(() => bots.id, { onDelete: "cascade" }),
    sourceWalletAddress: text("source_wallet_address").notNull(),
    targetWalletAddress: text("target_wallet_address").notNull(),
    marketSlug: text("market_slug").notNull(),
    side: text("side").notNull(),
    amountUsd: numeric("amount_usd", { precision: 16, scale: 2 }).notNull(),
    maxSlippageBps: integer("max_slippage_bps").notNull().default(100),
    status: text("status").notNull(),
    metadata: jsonb("metadata").notNull().default(sql`'{}'::JSONB`),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    executedAt: timestamp("executed_at", { withTimezone: true }),
  },
  (table) => [
    check("copy_trade_requests_side_check", sql`${table.side} IN ('LONG', 'SHORT')`),
    check(
      "copy_trade_requests_status_check",
      sql`${table.status} IN ('QUEUED', 'SUBMITTED', 'FILLED', 'FAILED')`,
    ),
    index("idx_copy_trade_status").on(table.status, table.createdAt),
  ],
);

export const trackedWallets = pgTable("tracked_wallets", {
  address: text("address").primaryKey(),
  source: text("source").notNull().default("manual"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
});

export const walletTrades = pgTable(
  "wallet_trades",
  {
    id: text("id").primaryKey(),
    walletAddress: text("wallet_address").notNull(),
    market: text("market").notNull(),
    assetId: text("asset_id").notNull(),
    side: text("side").notNull(),
    size: numeric("size", { precision: 30, scale: 10 }).notNull(),
    price: numeric("price", { precision: 30, scale: 10 }).notNull(),
    notionalUsd: numeric("notional_usd", { precision: 30, scale: 10 }).notNull(),
    outcome: text("outcome"),
    traderSide: text("trader_side"),
    matchTime: timestamp("match_time", { withTimezone: true }).notNull(),
    transactionHash: text("transaction_hash"),
    raw: jsonb("raw").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("idx_wallet_trades_wallet_match_time").on(table.walletAddress, table.matchTime)],
);

export const walletPerformanceLatest = pgTable("wallet_performance_latest", {
  walletAddress: text("wallet_address").primaryKey(),
  tradeCount30d: integer("trade_count_30d").notNull(),
  volumeUsd30d: numeric("volume_usd_30d", { precision: 30, scale: 10 }).notNull(),
  pnlEstimateUsd30d: numeric("pnl_estimate_usd_30d", { precision: 30, scale: 10 }).notNull(),
  returnEstimatePct30d: numeric("return_estimate_pct_30d", { precision: 20, scale: 8 }).notNull(),
  winRateEstimatePct30d: numeric("win_rate_estimate_pct_30d", { precision: 20, scale: 8 }).notNull(),
  lastTradeAt: timestamp("last_trade_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const telegramUsers = pgTable(
  "telegram_users",
  {
    telegramUserId: bigint("telegram_user_id", { mode: "number" }).primaryKey(),
    username: text("username"),
    eoaAddress: text("eoa_address"),
    polymarketSafeAddress: text("polymarket_safe_address"),
    isSafeDeployed: boolean("is_safe_deployed").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("idx_telegram_users_eoa_address").on(table.eoaAddress)],
);
