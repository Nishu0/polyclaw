import type { FastifyPluginAsync } from "fastify";
import { getLeaderboard, getLeaderboardStats } from "../lib/db.js";

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string" && value.length > 0) {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return undefined;
}

export const leaderboardRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/api/leaderboard", async (request) => {
    const q = request.query as Record<string, unknown>;

    const sortByRaw = typeof q.sortBy === "string" ? q.sortBy : "return30d";
    const sortBy =
      sortByRaw === "return7d" ||
      sortByRaw === "return30d" ||
      sortByRaw === "pnl30d" ||
      sortByRaw === "winRate" ||
      sortByRaw === "trades"
        ? sortByRaw
        : "return30d";

    const timeframeRaw = typeof q.timeframe === "string" ? q.timeframe : "30d";
    const timeframe = timeframeRaw === "7d" ? "7d" : "30d";

    const limit = Math.min(Math.max(toNumber(q.limit) ?? 50, 1), 200);
    const offset = Math.max(toNumber(q.offset) ?? 0, 0);
    const minTrades = toNumber(q.minTrades);
    const maxDrawdownPct = toNumber(q.maxDrawdownPct);

    const verifiedOnly =
      q.verifiedOnly === true || q.verifiedOnly === "true" || q.verifiedOnly === "1";

    const category = typeof q.category === "string" && q.category.trim().length > 0 ? q.category : undefined;

    const [rows, stats] = await Promise.all([
      getLeaderboard(fastify.db, {
        timeframe,
        sortBy,
        category,
        verifiedOnly,
        minTrades,
        maxDrawdownPct,
        limit,
        offset,
      }),
      getLeaderboardStats(fastify.db),
    ]);

    return {
      data: rows.rows,
      meta: {
        limit,
        offset,
        total: rows.total,
      },
      stats,
    };
  });

  fastify.get("/api/leaderboard/stats", async () => {
    return getLeaderboardStats(fastify.db);
  });
};
