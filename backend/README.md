# Backend (Fastify + PostgreSQL + Drizzle)

Fastify API for the Polymarket tracking/copy-trading frontend.

## What this backend covers

- Leaderboard routes for bot performance stats.
- Live Polymarket integration (CLOB trades sync by address).
- Bot details and open positions routes.
- Watchlist summary/bots/alerts routes per user wallet address.
- Copy-trade request route that uses bot source address from DB and queues a request.
- Telegram bot routes for user onboarding and Safe-wallet mapping.
- PostgreSQL schema + seed data.

This is API-first (routes), not terminal-based trading.

## 1) Start PostgreSQL

From `/Users/nisargthakkar/Projects/polymarket-molt/backend`:

```bash
docker compose up -d
```

## 2) Install and configure

```bash
cp .env.example .env
bun install
```

## 3) Migrate + seed

```bash
bun run db:migrate
bun run db:seed
```

## 3.1) Drizzle schema workflow

```bash
bun run db:generate
bun run db:migrate:drizzle
```

Optional:

```bash
bun run db:push
bun run db:studio
```

## 4) Run API

```bash
bun run dev
```

Server defaults to `http://localhost:4000`.

## Route summary

### Health
- `GET /health`

### Leaderboard
- `GET /api/leaderboard`
  - Query params: `sortBy`, `timeframe`, `category`, `verifiedOnly`, `minTrades`, `maxDrawdownPct`, `limit`, `offset`
- `GET /api/leaderboard/stats`

### Real Polymarket sync
- `POST /api/polymarket/sync`
  - Body: `{ "addresses": ["0x..."], "maxPages": 5 }`
  - Pulls real trades from Polymarket CLOB (`/data/trades`), stores raw trades + computed 30d stats, and updates `bots`/`bot_performance_latest`.
- `GET /api/polymarket/leaderboard/live?limit=50`
  - Returns live tracked address performance from synced data.

### Bot details
- `GET /api/bots/:botId`
- `GET /api/bots/:botId/positions?status=open|all`

### Watchlist
- `GET /api/watchlist/:userAddress/summary`
- `GET /api/watchlist/:userAddress/bots`
- `POST /api/watchlist/:userAddress/bots`
  - Body: `{ "botId": "..." }`
- `DELETE /api/watchlist/:userAddress/bots/:botId`
- `GET /api/watchlist/:userAddress/alerts?limit=20`
- `PATCH /api/watchlist/:userAddress/alerts/:alertId/read`

### Copy-trading
- `POST /api/copy-trades/execute`
  - Body:
```json
{
  "userAddress": "0xabc...",
  "sourceBotId": "10000000-0000-0000-0000-000000000001",
  "marketSlug": "trump-vs-biden-2028",
  "side": "LONG",
  "amountUsd": 150,
  "maxSlippageBps": 100
}
```
  - Returns `202` with queued copy-trade request id.

### Telegram + Safe onboarding (no backend private key)
- `POST /api/telegram/safe/init`
  - Body:
```json
{
  "telegramUserId": 123456789,
  "username": "alice",
  "eoaAddress": "0x..."
}
```
  - Derives Polymarket Safe address and stores mapping.
- `GET /api/telegram/users/:telegramUserId`
- `POST /api/telegram/safe/mark-deployed`
  - Body: `{ "telegramUserId": 123456789, "transactionHash": "0x..." }`
- `POST /api/telegram/webhook`
  - Supports `/start`, `/wallet`, `/help`
  - Optional header validation with `x-telegram-bot-api-secret-token`.

## Notes for frontend integration

- Existing frontend is static today; these routes provide the shape needed to replace hardcoded values.
- Use wallet-address keyed watchlist endpoints for user-specific tracking.
- Copy-trade route currently queues trade requests; execution worker/on-chain adapter can be added next.
- Private key custody is not required in backend for user Safe onboarding:
  - derive Safe address from user EOA
  - user signs deployment/transactions in Telegram WebApp wallet session
  - user funds the Safe directly with USDC on Polygon.
