import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";
import { getEnv } from "./env.js";

const { Client } = pg;

async function run() {
  const env = getEnv();
  const client = new Client({ connectionString: env.DATABASE_URL });

  await client.connect();

  try {
    const migrationsDir = path.resolve(process.cwd(), "db/migrations");
    const files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();

    for (const file of files) {
      const fullPath = path.join(migrationsDir, file);
      const sql = await readFile(fullPath, "utf8");
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("COMMIT");
      // eslint-disable-next-line no-console
      console.log(`Applied migration: ${file}`);
    }
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
