import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import pg from "pg";

const { Pool } = pg;

declare module "fastify" {
  interface FastifyInstance {
    db: pg.Pool;
  }
}

const dbPlugin: FastifyPluginAsync<{ connectionString: string }> = async (
  fastify,
  opts,
) => {
  const pool = new Pool({
    connectionString: opts.connectionString,
  });

  pool.on("error", (error) => {
    fastify.log.error({ err: error }, "PostgreSQL pool error");
  });

  fastify.decorate("db", pool);

  fastify.addHook("onClose", async () => {
    await pool.end();
  });
};

export default fp(dbPlugin, {
  name: "db",
});
