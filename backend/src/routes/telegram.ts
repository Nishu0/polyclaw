import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { derivePolymarketSafeAddress } from "../lib/safe.js";
import { getTelegramUser, upsertTelegramUser } from "../lib/live-db.js";

interface TelegramWebhookMessage {
  message?: {
    text?: string;
    chat?: { id: number };
    from?: { id: number; username?: string };
  };
}

async function sendTelegramMessage(token: string, chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

const safeInitSchema = z.object({
  telegramUserId: z.number().int().positive(),
  username: z.string().optional(),
  eoaAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

const safeDeploySchema = z.object({
  telegramUserId: z.number().int().positive(),
  transactionHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
});

export const telegramRoutes: FastifyPluginAsync<{
  botToken?: string;
  webhookSecret?: string;
  webappUrl?: string;
}> = async (fastify, opts) => {
  fastify.post("/api/telegram/safe/init", async (request, reply) => {
    const parsed = safeInitSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: parsed.error.issues[0]?.message ?? "Invalid body" });
    }

    const safeAddress = derivePolymarketSafeAddress(parsed.data.eoaAddress, 137);

    const user = await upsertTelegramUser(fastify.db, {
      telegramUserId: parsed.data.telegramUserId,
      username: parsed.data.username,
      eoaAddress: parsed.data.eoaAddress,
      polymarketSafeAddress: safeAddress,
      isSafeDeployed: false,
    });

    return {
      telegramUserId: Number(user?.telegram_user_id ?? parsed.data.telegramUserId),
      eoaAddress: user?.eoa_address ?? parsed.data.eoaAddress.toLowerCase(),
      polymarketSafeAddress: user?.polymarket_safe_address ?? safeAddress,
      deployment: {
        mode: "user_signed",
        status: user?.is_safe_deployed ? "deployed" : "pending_deploy",
        note: "No backend private key is used. User signs Safe deployment from Telegram WebApp wallet session.",
      },
      funding: {
        depositToken: "USDC",
        network: "Polygon",
        depositAddress: user?.polymarket_safe_address ?? safeAddress,
      },
    };
  });

  fastify.get("/api/telegram/users/:telegramUserId", async (request, reply) => {
    const { telegramUserId } = request.params as { telegramUserId: string };
    const id = Number(telegramUserId);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({ error: "Invalid telegramUserId" });
    }

    const user = await getTelegramUser(fastify.db, id);
    if (!user) {
      return reply.code(404).send({ error: "Telegram user not found" });
    }

    return {
      telegramUserId: Number(user.telegram_user_id),
      username: user.username,
      eoaAddress: user.eoa_address,
      polymarketSafeAddress: user.polymarket_safe_address,
      isSafeDeployed: user.is_safe_deployed,
    };
  });

  fastify.post("/api/telegram/safe/mark-deployed", async (request, reply) => {
    const parsed = safeDeploySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: parsed.error.issues[0]?.message ?? "Invalid body" });
    }

    const user = await getTelegramUser(fastify.db, parsed.data.telegramUserId);
    if (!user) {
      return reply.code(404).send({ error: "Telegram user not found" });
    }

    await upsertTelegramUser(fastify.db, {
      telegramUserId: parsed.data.telegramUserId,
      isSafeDeployed: true,
    });

    return {
      telegramUserId: parsed.data.telegramUserId,
      polymarketSafeAddress: user.polymarket_safe_address,
      isSafeDeployed: true,
      deploymentTxHash: parsed.data.transactionHash,
    };
  });

  fastify.post("/api/telegram/webhook", async (request, reply) => {
    if (opts.webhookSecret) {
      const secret = request.headers["x-telegram-bot-api-secret-token"];
      if (secret !== opts.webhookSecret) {
        return reply.code(401).send({ error: "Invalid telegram secret" });
      }
    }

    if (!opts.botToken) {
      return reply.code(503).send({ error: "TELEGRAM_BOT_TOKEN not configured" });
    }

    const payload = (request.body ?? {}) as TelegramWebhookMessage;
    const chatId = payload.message?.chat?.id;
    const text = payload.message?.text?.trim();
    const fromId = payload.message?.from?.id;
    const username = payload.message?.from?.username;

    if (!chatId || !text || !fromId) {
      return { ok: true };
    }

    await upsertTelegramUser(fastify.db, {
      telegramUserId: fromId,
      username,
    });

    if (text === "/start") {
      const appUrl = opts.webappUrl ?? "https://your-webapp.example";
      await sendTelegramMessage(
        opts.botToken,
        chatId,
        `Welcome. Open the WebApp to connect wallet, derive your Polymarket Safe, and fund it: ${appUrl}`,
      );
    } else if (text === "/wallet") {
      const user = await getTelegramUser(fastify.db, fromId);
      if (!user?.polymarket_safe_address) {
        await sendTelegramMessage(
          opts.botToken,
          chatId,
          "No Safe wallet yet. Open WebApp, connect wallet, then run /wallet again.",
        );
      } else {
        await sendTelegramMessage(
          opts.botToken,
          chatId,
          `Your Polymarket Safe: ${user.polymarket_safe_address}\nNetwork: Polygon\nDeposit USDC to start copy trading.`,
        );
      }
    } else if (text === "/help") {
      await sendTelegramMessage(
        opts.botToken,
        chatId,
        "Commands:\n/start\n/wallet\n/help",
      );
    }

    return { ok: true };
  });
};
