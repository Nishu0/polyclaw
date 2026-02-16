import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import pg from "pg";
import type { AppDb } from "../db/client.js";
import { createDrizzle } from "../db/client.js";

const { Pool } = pg;

declare module "fastify" {
  interface FastifyInstance {
    db: pg.Pool;
    orm: AppDb;
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
  fastify.decorate("orm", createDrizzle(pool));

  fastify.addHook("onClose", async () => {
    await pool.end();
  });
};

export default fp(dbPlugin, {
  name: "db",
});
