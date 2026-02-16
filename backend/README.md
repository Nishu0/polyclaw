# Backend (Fastify + PostgreSQL)

Fastify API for the Polymarket tracking/copy-trading frontend.

## What this backend covers

- Leaderboard routes for bot performance stats.
- Bot details and open positions routes.
- Watchlist summary/bots/alerts routes per user wallet address.
- Copy-trade request route that uses bot source address from DB and queues a request.
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
npm install
```

## 3) Migrate + seed

```bash
npm run db:migrate
npm run db:seed
```

## 4) Run API

```bash
npm run dev
```

Server defaults to `http://localhost:4000`.

## Route summary

### Health
- `GET /health`

### Leaderboard
- `GET /api/leaderboard`
  - Query params: `sortBy`, `timeframe`, `category`, `verifiedOnly`, `minTrades`, `maxDrawdownPct`, `limit`, `offset`
- `GET /api/leaderboard/stats`

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

## Notes for frontend integration

- Existing frontend is static today; these routes provide the shape needed to replace hardcoded values.
- Use wallet-address keyed watchlist endpoints for user-specific tracking.
- Copy-trade route currently queues trade requests; execution worker/on-chain adapter can be added next.
