import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import {
  getLiveTrackedPerformance,
  upsertBotPerformanceFromWallet,
  upsertTrackedWallet,
  upsertWalletPerformance,
  upsertWalletTrades,
} from "../lib/live-db.js";
import {
  computeWalletPerformance,
  createPolymarketPublicClient,
  fetchTradesForAddress,
} from "../lib/polymarket.js";

const syncBodySchema = z.object({
  addresses: z.array(z.string()).optional(),
  maxPages: z.number().int().min(1).max(30).optional(),
});

export const polymarketLiveRoutes: FastifyPluginAsync<{ clobHttpUrl: string; trackedAddresses: string[] }> =
  async (fastify, opts) => {
    const client = createPolymarketPublicClient(opts.clobHttpUrl);

    fastify.post("/api/polymarket/sync", async (request, reply) => {
      const parsed = syncBodySchema.safeParse(request.body ?? {});
      if (!parsed.success) {
        return reply.code(400).send({ error: parsed.error.issues[0]?.message ?? "Invalid payload" });
      }

      const addresses = (parsed.data.addresses ?? opts.trackedAddresses)
        .map((address) => address.toLowerCase())
        .filter((address) => address.startsWith("0x") && address.length === 42);

      if (addresses.length === 0) {
        return reply.code(400).send({ error: "No valid addresses provided" });
      }

      const maxPages = parsed.data.maxPages ?? 5;
      const synced: Array<{ address: string; tradeCountFetched: number }> = [];

      for (const address of addresses) {
        const trades = await fetchTradesForAddress(client, address, maxPages);
        const performance = computeWalletPerformance(address, trades);

        await upsertTrackedWallet(fastify.db, address, "api_sync");
        await upsertWalletTrades(fastify.db, address, trades);
        await upsertWalletPerformance(fastify.db, performance);
        await upsertBotPerformanceFromWallet(fastify.db, performance);

        synced.push({ address, tradeCountFetched: trades.length });
      }

      return {
        syncedCount: synced.length,
        synced,
      };
    });

    fastify.get("/api/polymarket/leaderboard/live", async (request) => {
      const q = request.query as Record<string, unknown>;
      const limitRaw = typeof q.limit === "string" ? Number(q.limit) : 50;
      const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 50;

      const data = await getLiveTrackedPerformance(fastify.db, limit);
      return { data };
    });
  };
