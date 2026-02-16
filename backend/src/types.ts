export type Side = "LONG" | "SHORT";

export interface LeaderboardBot {
  id: string;
  name: string;
  address: string;
  strategy: string;
  rank: number;
  verified: boolean;
  active: boolean;
  return7d: number;
  return30d: number;
  pnl30dUsd: number;
  maxDrawdownPct: number;
  totalTrades: number;
  winRatePct: number;
  lastActiveAt: string;
}

export interface LeaderboardStats {
  totalBots: number;
  volume24hUsd: number;
  avg30dReturnPct: number;
  topPerformer: {
    botId: string;
    name: string;
    return30d: number;
  } | null;
}
