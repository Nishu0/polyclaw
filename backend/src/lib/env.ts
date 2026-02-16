export interface AppEnv {
  PORT: number;
  HOST: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  CORS_ORIGIN: string;
}

export function getEnv(): AppEnv {
  const portRaw = process.env.PORT ?? "4000";
  const port = Number.parseInt(portRaw, 10);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT: ${portRaw}`);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  return {
    PORT: port,
    HOST: process.env.HOST ?? "0.0.0.0",
    NODE_ENV: process.env.NODE_ENV ?? "development",
    DATABASE_URL: databaseUrl,
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  };
}
