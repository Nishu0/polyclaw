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
--> statement-breakpoint
CREATE TABLE "alerts" (
	"id" uuid PRIMARY KEY DEFAULT app_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"bot_id" uuid,
	"alert_type" text NOT NULL,
	"severity" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "alerts_severity_check" CHECK ("alerts"."severity" IN ('info', 'warning', 'critical'))
);
--> statement-breakpoint
CREATE TABLE "bot_performance_latest" (
	"bot_id" uuid PRIMARY KEY NOT NULL,
	"return_7d_pct" numeric(10, 4) DEFAULT '0' NOT NULL,
	"return_30d_pct" numeric(10, 4) DEFAULT '0' NOT NULL,
	"pnl_30d_usd" numeric(16, 2) DEFAULT '0' NOT NULL,
	"max_drawdown_pct" numeric(10, 4) DEFAULT '0' NOT NULL,
	"total_trades" integer DEFAULT 0 NOT NULL,
	"win_rate_pct" numeric(10, 4) DEFAULT '0' NOT NULL,
	"volume_24h_usd" numeric(16, 2) DEFAULT '0' NOT NULL,
	"best_category" text DEFAULT 'N/A' NOT NULL,
	"equity_usd" numeric(16, 2) DEFAULT '0' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bot_positions" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bot_positions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"bot_id" uuid NOT NULL,
	"market" text NOT NULL,
	"side" text NOT NULL,
	"entry_price" numeric(10, 4) NOT NULL,
	"current_price" numeric(10, 4) NOT NULL,
	"size_usd" numeric(16, 2) NOT NULL,
	"unrealized_pnl_usd" numeric(16, 2) NOT NULL,
	"is_open" boolean DEFAULT true NOT NULL,
	"opened_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bot_positions_side_check" CHECK ("bot_positions"."side" IN ('LONG', 'SHORT'))
);
--> statement-breakpoint
CREATE TABLE "bots" (
	"id" uuid PRIMARY KEY DEFAULT app_uuid() NOT NULL,
	"name" text NOT NULL,
	"wallet_address" text NOT NULL,
	"strategy" text NOT NULL,
	"logic" text DEFAULT '' NOT NULL,
	"risk_style" text DEFAULT 'Moderate' NOT NULL,
	"avg_hold" text DEFAULT '0h' NOT NULL,
	"leverage" text DEFAULT '1x' NOT NULL,
	"markets" text[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"rank" integer DEFAULT 0 NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bots_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
CREATE TABLE "copy_trade_requests" (
	"id" uuid PRIMARY KEY DEFAULT app_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"source_bot_id" uuid NOT NULL,
	"source_wallet_address" text NOT NULL,
	"target_wallet_address" text NOT NULL,
	"market_slug" text NOT NULL,
	"side" text NOT NULL,
	"amount_usd" numeric(16, 2) NOT NULL,
	"max_slippage_bps" integer DEFAULT 100 NOT NULL,
	"status" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::JSONB NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"executed_at" timestamp with time zone,
	CONSTRAINT "copy_trade_requests_side_check" CHECK ("copy_trade_requests"."side" IN ('LONG', 'SHORT')),
	CONSTRAINT "copy_trade_requests_status_check" CHECK ("copy_trade_requests"."status" IN ('QUEUED', 'SUBMITTED', 'FILLED', 'FAILED'))
);
--> statement-breakpoint
CREATE TABLE "telegram_users" (
	"telegram_user_id" bigint PRIMARY KEY NOT NULL,
	"username" text,
	"eoa_address" text,
	"polymarket_safe_address" text,
	"is_safe_deployed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tracked_wallets" (
	"address" text PRIMARY KEY NOT NULL,
	"source" text DEFAULT 'manual' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_synced_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT app_uuid() NOT NULL,
	"wallet_address" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
CREATE TABLE "wallet_performance_latest" (
	"wallet_address" text PRIMARY KEY NOT NULL,
	"trade_count_30d" integer NOT NULL,
	"volume_usd_30d" numeric(30, 10) NOT NULL,
	"pnl_estimate_usd_30d" numeric(30, 10) NOT NULL,
	"return_estimate_pct_30d" numeric(20, 8) NOT NULL,
	"win_rate_estimate_pct_30d" numeric(20, 8) NOT NULL,
	"last_trade_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallet_trades" (
	"id" text PRIMARY KEY NOT NULL,
	"wallet_address" text NOT NULL,
	"market" text NOT NULL,
	"asset_id" text NOT NULL,
	"side" text NOT NULL,
	"size" numeric(30, 10) NOT NULL,
	"price" numeric(30, 10) NOT NULL,
	"notional_usd" numeric(30, 10) NOT NULL,
	"outcome" text,
	"trader_side" text,
	"match_time" timestamp with time zone NOT NULL,
	"transaction_hash" text,
	"raw" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "watchlist_entries" (
	"user_id" uuid NOT NULL,
	"bot_id" uuid NOT NULL,
	"alerts_enabled" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "watchlist_entries_user_id_bot_id_pk" PRIMARY KEY("user_id","bot_id")
);
--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_bot_id_bots_id_fk" FOREIGN KEY ("bot_id") REFERENCES "public"."bots"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bot_performance_latest" ADD CONSTRAINT "bot_performance_latest_bot_id_bots_id_fk" FOREIGN KEY ("bot_id") REFERENCES "public"."bots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bot_positions" ADD CONSTRAINT "bot_positions_bot_id_bots_id_fk" FOREIGN KEY ("bot_id") REFERENCES "public"."bots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "copy_trade_requests" ADD CONSTRAINT "copy_trade_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "copy_trade_requests" ADD CONSTRAINT "copy_trade_requests_source_bot_id_bots_id_fk" FOREIGN KEY ("source_bot_id") REFERENCES "public"."bots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist_entries" ADD CONSTRAINT "watchlist_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist_entries" ADD CONSTRAINT "watchlist_entries_bot_id_bots_id_fk" FOREIGN KEY ("bot_id") REFERENCES "public"."bots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_alerts_user_created" ON "alerts" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_bot_performance_return_30d" ON "bot_performance_latest" USING btree ("return_30d_pct");--> statement-breakpoint
CREATE INDEX "idx_bots_strategy" ON "bots" USING btree ("strategy");--> statement-breakpoint
CREATE INDEX "idx_copy_trade_status" ON "copy_trade_requests" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "idx_telegram_users_eoa_address" ON "telegram_users" USING btree ("eoa_address");--> statement-breakpoint
CREATE INDEX "idx_wallet_trades_wallet_match_time" ON "wallet_trades" USING btree ("wallet_address","match_time");--> statement-breakpoint
CREATE INDEX "idx_watchlist_user" ON "watchlist_entries" USING btree ("user_id");
