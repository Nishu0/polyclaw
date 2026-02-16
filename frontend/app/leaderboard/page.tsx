import { FilterSidebar } from "@/components/leaderboard/FilterSidebar";
import { StatsHeader } from "@/components/leaderboard/StatsHeader";
import { BotTable } from "@/components/leaderboard/BotTable";
import { getLeaderboard } from "@/lib/api";

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard(50, 0);

  return (
    <div className="flex bg-background-dark text-white font-display antialiased overflow-hidden h-[calc(100vh-64px)] pt-16">
      <FilterSidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-background-dark relative overflow-y-auto">
        <StatsHeader stats={leaderboard.stats} />
        <BotTable
          bots={leaderboard.data}
          total={leaderboard.meta.total}
          offset={leaderboard.meta.offset}
        />
      </main>
    </div>
  );
}
