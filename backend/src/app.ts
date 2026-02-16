import Fastify from "fastify";
import cors from "@fastify/cors";
import dbPlugin from "./plugins/db.js";
import { healthRoute } from "./routes/health.js";
import { leaderboardRoutes } from "./routes/leaderboard.js";
import { botRoutes } from "./routes/bots.js";
import { watchlistRoutes } from "./routes/watchlist.js";
import { copyTradeRoutes } from "./routes/copy-trades.js";
import { polymarketLiveRoutes } from "./routes/polymarket-live.js";
import { telegramRoutes } from "./routes/telegram.js";
import type { AppEnv } from "./lib/env.js";

export function buildApp(env: AppEnv) {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === "production" ? "info" : "debug",
    },
  });

  app.register(cors, {
    origin: env.CORS_ORIGIN,
    credentials: true,
  });

  app.register(dbPlugin, {
    connectionString: env.DATABASE_URL,
  });

  app.register(healthRoute);
  app.register(leaderboardRoutes);
  app.register(botRoutes);
  app.register(watchlistRoutes);
  app.register(copyTradeRoutes);
  app.register(polymarketLiveRoutes, {
    clobHttpUrl: env.CLOB_HTTP_URL,
    trackedAddresses: env.POLYMARKET_TRACKED_ADDRESSES,
  });
  app.register(telegramRoutes, {
    botToken: env.TELEGRAM_BOT_TOKEN,
    webhookSecret: env.TELEGRAM_WEBHOOK_SECRET,
    webappUrl: env.TELEGRAM_WEBAPP_URL,
  });

  app.setErrorHandler((error, _request, reply) => {
    app.log.error({ err: error }, "Unhandled error");
    reply.code(500).send({ error: "Internal Server Error" });
  });

  return app;
}
