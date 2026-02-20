export const dynamic = "force-dynamic";

import { WatchlistHeader } from "@/components/watchlist/WatchlistHeader";
import { WatchlistSummary } from "@/components/watchlist/WatchlistSummary";
import { WatchlistTable } from "@/components/watchlist/WatchlistTable";
import { RecentActivity } from "@/components/watchlist/RecentActivity";
import { getWatchlistSummary, getWatchlistBots, getWatchlistAlerts } from "@/lib/api";

// Demo wallet — in production this would come from wallet connection context.
// Using the top tracked Polymarket whale address for a live demo.
const DEMO_WALLET = "0x0000000000000000000000000000000000000001";

export default async function WatchlistPage() {
  const [summaryRes, botsRes, alertsRes] = await Promise.allSettled([
    getWatchlistSummary(DEMO_WALLET),
    getWatchlistBots(DEMO_WALLET),
    getWatchlistAlerts(DEMO_WALLET, 20),
  ]);

  const summary =
    summaryRes.status === "fulfilled"
      ? summaryRes.value
      : { activeBots: 0, totalPnl30dUsd: 0, avgReturn30dPct: 0, avgWinRatePct: 0, totalVolumeUsd: 0 };

  const bots = botsRes.status === "fulfilled" ? botsRes.value.data : [];
  const alerts = alertsRes.status === "fulfilled" ? alertsRes.value.data : [];

  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col font-display antialiased overflow-x-hidden selection:bg-[#ff6a00]/30 selection:text-[#ff6a00] pt-24">
      <main className="flex-1 px-6 pb-12 max-w-[1400px] mx-auto w-full">
        <WatchlistHeader />
        <div className="space-y-6">
          <WatchlistSummary summary={summary} />
          <WatchlistTable bots={bots} />
        </div>
        <RecentActivity alerts={alerts} />
      </main>
    </div>
  );
}
