import type { FastifyPluginAsync } from "fastify";
import {
  addToWatchlist,
  findOrCreateUser,
  getAlerts,
  getWatchlistBots,
  getWatchlistSummary,
  markAlertRead,
  removeFromWatchlist,
} from "../lib/db.js";

function parseLimit(value: unknown, fallback: number): number {
  if (typeof value === "string") {
    const n = Number(value);
    if (!Number.isNaN(n)) {
      return n;
    }
  }
  if (typeof value === "number") {
    return value;
  }
  return fallback;
}

export const watchlistRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/api/watchlist/:userAddress/summary", async (request) => {
    const { userAddress } = request.params as { userAddress: string };
    const user = await findOrCreateUser(fastify.db, userAddress);
    const summary = await getWatchlistSummary(fastify.db, user.id);

    return summary;
  });

  fastify.get("/api/watchlist/:userAddress/bots", async (request) => {
    const { userAddress } = request.params as { userAddress: string };
    const user = await findOrCreateUser(fastify.db, userAddress);
    const bots = await getWatchlistBots(fastify.db, user.id);

    return { data: bots };
  });

  fastify.post("/api/watchlist/:userAddress/bots", async (request, reply) => {
    const { userAddress } = request.params as { userAddress: string };
    const body = request.body as { botId?: string };

    if (!body.botId) {
      return reply.code(400).send({ error: "botId is required" });
    }

    const user = await findOrCreateUser(fastify.db, userAddress);
    await addToWatchlist(fastify.db, user.id, body.botId);

    return reply.code(201).send({ ok: true });
  });

  fastify.delete("/api/watchlist/:userAddress/bots/:botId", async (request) => {
    const { userAddress, botId } = request.params as { userAddress: string; botId: string };
    const user = await findOrCreateUser(fastify.db, userAddress);
    await removeFromWatchlist(fastify.db, user.id, botId);

    return { ok: true };
  });

  fastify.get("/api/watchlist/:userAddress/alerts", async (request) => {
    const { userAddress } = request.params as { userAddress: string };
    const q = request.query as Record<string, unknown>;
    const limit = Math.min(Math.max(parseLimit(q.limit, 20), 1), 200);

    const user = await findOrCreateUser(fastify.db, userAddress);
    const alerts = await getAlerts(fastify.db, user.id, limit);

    return { data: alerts };
  });

  fastify.patch(
    "/api/watchlist/:userAddress/alerts/:alertId/read",
    async (request, reply) => {
      const { userAddress, alertId } = request.params as {
        userAddress: string;
        alertId: string;
      };

      const user = await findOrCreateUser(fastify.db, userAddress);
      const updated = await markAlertRead(fastify.db, user.id, alertId);

      if (!updated) {
        return reply.code(404).send({ error: "Alert not found" });
      }

      return { ok: true };
    },
  );
};
