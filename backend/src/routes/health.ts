import type { FastifyPluginAsync } from "fastify";

export const healthRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/health", async () => ({
    ok: true,
    service: "polymarket-molt-backend",
    ts: new Date().toISOString(),
  }));
};
