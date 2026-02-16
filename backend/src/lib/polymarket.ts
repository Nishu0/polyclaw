import { Chain, ClobClient, type Trade } from "@polymarket/clob-client";

export interface WalletPerformance {
  walletAddress: string;
  tradeCount30d: number;
  volumeUsd30d: number;
  pnlEstimateUsd30d: number;
  returnEstimatePct30d: number;
  winRateEstimatePct30d: number;
  lastTradeAt: string | null;
}

const DAYS_30_MS = 30 * 24 * 60 * 60 * 1000;

export function createPolymarketPublicClient(clobHttpUrl: string) {
  return new ClobClient(clobHttpUrl, Chain.POLYGON);
}

export async function fetchTradesForAddress(
  client: ClobClient,
  walletAddress: string,
  maxPages = 5,
): Promise<Trade[]> {
  const all: Trade[] = [];
  let nextCursor: string | undefined = undefined;

  for (let i = 0; i < maxPages; i += 1) {
    const page = await client.getTradesPaginated(
      {
        maker_address: walletAddress.toLowerCase(),
      },
      nextCursor,
    );

    all.push(...page.trades);

    if (!page.next_cursor || page.next_cursor === "LTE=") {
      break;
    }

    nextCursor = page.next_cursor;
  }

  return all;
}

export function computeWalletPerformance(walletAddress: string, trades: Trade[]): WalletPerformance {
  const nowMs = Date.now();
  const cutoffMs = nowMs - DAYS_30_MS;

  const recent = trades.filter((trade) => {
    const matchMs = new Date(trade.match_time).getTime();
    return Number.isFinite(matchMs) && matchMs >= cutoffMs;
  });

  let volume = 0;
  let pnlEstimate = 0;
  let winCount = 0;
  let lossCount = 0;
  let lastTradeAtMs = 0;

  for (const trade of recent) {
    const size = Number(trade.size);
    const price = Number(trade.price);
    if (!Number.isFinite(size) || !Number.isFinite(price)) {
      continue;
    }

    const notional = size * price;
    volume += notional;

    // Cashflow estimate: BUY is spend (negative), SELL is receive (positive)
    const side = trade.side.toUpperCase();
    const signedCashflow = side === "BUY" ? -notional : notional;
    pnlEstimate += signedCashflow;

    if (signedCashflow >= 0) {
      winCount += 1;
    } else {
      lossCount += 1;
    }

    const matchTimeMs = new Date(trade.match_time).getTime();
    if (Number.isFinite(matchTimeMs) && matchTimeMs > lastTradeAtMs) {
      lastTradeAtMs = matchTimeMs;
    }
  }

  const tradeCount = winCount + lossCount;
  const returnPct = volume > 0 ? (pnlEstimate / volume) * 100 : 0;
  const winRate = tradeCount > 0 ? (winCount / tradeCount) * 100 : 0;

  return {
    walletAddress: walletAddress.toLowerCase(),
    tradeCount30d: tradeCount,
    volumeUsd30d: Number(volume.toFixed(6)),
    pnlEstimateUsd30d: Number(pnlEstimate.toFixed(6)),
    returnEstimatePct30d: Number(returnPct.toFixed(6)),
    winRateEstimatePct30d: Number(winRate.toFixed(6)),
    lastTradeAt: lastTradeAtMs > 0 ? new Date(lastTradeAtMs).toISOString() : null,
  };
}
