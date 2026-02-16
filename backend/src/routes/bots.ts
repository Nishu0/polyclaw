import type { FastifyPluginAsync } from "fastify";
import { getBotDetails, getBotPositions } from "../lib/db.js";

export const botRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/api/bots/:botId", async (request, reply) => {
    const { botId } = request.params as { botId: string };
    const details = await getBotDetails(fastify.db, botId);

    if (!details) {
      return reply.code(404).send({ error: "Bot not found" });
    }

    return details;
  });

  fastify.get("/api/bots/:botId/positions", async (request) => {
    const { botId } = request.params as { botId: string };
    const q = request.query as Record<string, unknown>;
    const onlyOpen = q.status !== "all";

    const positions = await getBotPositions(fastify.db, botId, onlyOpen);
    return { data: positions };
  });
};
