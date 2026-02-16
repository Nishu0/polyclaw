import type { FastifyPluginAsync } from "fastify";
import { createCopyTradeRequest, findOrCreateUser } from "../lib/db.js";
import type { Side } from "../types.js";

function isSide(input: string): input is Side {
  return input === "LONG" || input === "SHORT";
}

export const copyTradeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/api/copy-trades/execute", async (request, reply) => {
    const body = request.body as {
      userAddress?: string;
      sourceBotId?: string;
      marketSlug?: string;
      side?: string;
      amountUsd?: number;
      maxSlippageBps?: number;
    };

    if (!body.userAddress || !body.sourceBotId || !body.marketSlug || !body.side) {
      return reply.code(400).send({
        error: "userAddress, sourceBotId, marketSlug, and side are required",
      });
    }

    if (!isSide(body.side)) {
      return reply.code(400).send({ error: "side must be LONG or SHORT" });
    }

    if (typeof body.amountUsd !== "number" || body.amountUsd <= 0) {
      return reply.code(400).send({ error: "amountUsd must be a positive number" });
    }

    const user = await findOrCreateUser(fastify.db, body.userAddress);

    try {
      const queued = await createCopyTradeRequest(fastify.db, {
        userId: user.id,
        sourceBotId: body.sourceBotId,
        targetWalletAddress: user.walletAddress,
        marketSlug: body.marketSlug,
        side: body.side,
        amountUsd: body.amountUsd,
        maxSlippageBps: body.maxSlippageBps,
      });

      return reply.code(202).send({
        status: queued.status,
        copyTradeRequestId: queued.id,
        queuedAt: queued.created_at,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Bot not found") {
        return reply.code(404).send({ error: error.message });
      }
      throw error;
    }
  });
};
