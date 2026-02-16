import { buildApp } from "./app.js";
import { getEnv } from "./lib/env.js";

async function main() {
  const env = getEnv();
  const app = buildApp(env);

  await app.listen({
    host: env.HOST,
    port: env.PORT,
  });

  app.log.info(`Backend listening on http://${env.HOST}:${env.PORT}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
