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

export interface LeaderboardResponse {
  data: LeaderboardBot[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
  stats: LeaderboardStats;
}

export interface BotDetailsResponse {
  id: string;
  name: string;
  address: string;
  strategy: string;
  verified: boolean;
  active: boolean;
  rank: number;
  strategyInfo: {
    logic: string;
    riskStyle: string;
    avgHold: string;
    leverage: string;
    markets: string[];
    winRatePct: number;
  };
  performance: {
    return7d: number;
    return30d: number;
    pnl30dUsd: number;
    maxDrawdownPct: number;
    totalTrades: number;
    bestCategory: string;
    equityUsd: number;
  };
}

export interface BotPosition {
  id: number;
  market: string;
  side: "LONG" | "SHORT";
  entryPrice: number;
  currentPrice: number;
  sizeUsd: number;
  unrealizedPnlUsd: number;
  isOpen: boolean;
  openedAt: string;
}

export interface WatchlistBot {
  botId: string;
  name: string;
  address: string;
  strategy: string;
  active: boolean;
  return7d: number;
  return30d: number;
  pnl30dUsd: number;
  maxDrawdownPct: number;
  lastActiveAt: string;
  todayPnlUsd: number;
}

export interface WatchlistSummaryData {
  activeBots: number;
  totalPnl30dUsd: number;
  avgReturn30dPct: number;
  avgWinRatePct: number;
  totalVolumeUsd: number;
}

export interface WatchlistAlert {
  id: string;
  type: string;
  message: string;
  detail: string;
  isRead: boolean;
  createdAt: string;
}

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:4000";

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}): ${path}`);
  }

  return (await response.json()) as T;
}

export async function getLeaderboard(limit = 50, offset = 0): Promise<LeaderboardResponse> {
  return apiFetch<LeaderboardResponse>(
    `/api/leaderboard?limit=${limit}&offset=${offset}&sortBy=return30d`,
  );
}

export async function getBotDetails(id: string): Promise<BotDetailsResponse> {
  return apiFetch<BotDetailsResponse>(`/api/bots/${id}`);
}

export async function getBotPositions(id: string): Promise<{ data: BotPosition[] }> {
  return apiFetch<{ data: BotPosition[] }>(`/api/bots/${id}/positions?status=open`);
}

export async function getWatchlistSummary(userAddress: string): Promise<WatchlistSummaryData> {
  return apiFetch<WatchlistSummaryData>(`/api/watchlist/${userAddress}/summary`);
}

export async function getWatchlistBots(userAddress: string): Promise<{ data: WatchlistBot[] }> {
  return apiFetch<{ data: WatchlistBot[] }>(`/api/watchlist/${userAddress}/bots`);
}

export async function getWatchlistAlerts(
  userAddress: string,
  limit = 20,
): Promise<{ data: WatchlistAlert[] }> {
  return apiFetch<{ data: WatchlistAlert[] }>(
    `/api/watchlist/${userAddress}/alerts?limit=${limit}`,
  );
}
