import "dotenv/config";

export interface AppEnv {
  PORT: number;
  HOST: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  CORS_ORIGIN: string;
  CLOB_HTTP_URL: string;
  POLYMARKET_TRACKED_ADDRESSES: string[];
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_WEBHOOK_SECRET?: string;
  TELEGRAM_WEBAPP_URL?: string;
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
    CLOB_HTTP_URL: process.env.CLOB_HTTP_URL ?? "https://clob.polymarket.com",
    POLYMARKET_TRACKED_ADDRESSES: (process.env.POLYMARKET_TRACKED_ADDRESSES ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter((value) => value.length > 0),
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
    TELEGRAM_WEBAPP_URL: process.env.TELEGRAM_WEBAPP_URL,
  };
}
