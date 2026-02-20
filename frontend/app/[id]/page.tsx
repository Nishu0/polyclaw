export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { BotHeader } from "@/components/bot/BotHeader";
import { PerformanceCards } from "@/components/bot/PerformanceCards";
import { EquityChart } from "@/components/bot/EquityChart";
import { StrategyInfo } from "@/components/bot/StrategyInfo";
import { PositionsTable } from "@/components/bot/PositionsTable";
import { SimilarBots } from "@/components/bot/SimilarBots";
import { getBotDetails, getBotPositions, getLeaderboard } from "@/lib/api";

interface BotDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function fetchBotPageData(id: string) {
  try {
    const [bot, positions, leaderboard] = await Promise.all([
      getBotDetails(id),
      getBotPositions(id),
      getLeaderboard(8, 0),
    ]);

    return { bot, positions, leaderboard };
  } catch {
    return null;
  }
}

export default async function BotDetailsPage({ params }: BotDetailsPageProps) {
  const { id } = await params;

  const data = await fetchBotPageData(id);
  if (!data) {
    notFound();
  }

  const similar = data.leaderboard.data.filter((item) => item.id !== id).slice(0, 4);

  return (
    <div className="bg-[#f8f7f5] dark:bg-[#0a0a0a] min-h-screen flex flex-col font-display antialiased overflow-x-hidden selection:bg-[#ff6a00] selection:text-white pt-20">
      <main className="flex-1 pb-12 px-6 max-w-[1400px] mx-auto w-full">
        <BotHeader
          name={data.bot.name}
          rank={data.bot.rank}
          address={data.bot.address}
          active={data.bot.active}
        />
        <PerformanceCards performance={data.bot.performance} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <EquityChart
            equityUsd={data.bot.performance.equityUsd}
            return7d={data.bot.performance.return7d}
          />
          <StrategyInfo strategyInfo={data.bot.strategyInfo} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PositionsTable positions={data.positions.data} />
          <SimilarBots bots={similar} />
        </div>
      </main>
    </div>
  );
}
