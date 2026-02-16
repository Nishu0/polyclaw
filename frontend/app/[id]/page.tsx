import { BotHeader } from "@/components/bot/BotHeader";
import { PerformanceCards } from "@/components/bot/PerformanceCards";
import { EquityChart } from "@/components/bot/EquityChart";
import { StrategyInfo } from "@/components/bot/StrategyInfo";
import { PositionsTable } from "@/components/bot/PositionsTable";
import { SimilarBots } from "@/components/bot/SimilarBots";

export default function BotDetailsPage() {
  return (
    <div className="bg-[#f8f7f5] dark:bg-[#0a0a0a] min-h-screen flex flex-col font-display antialiased overflow-x-hidden selection:bg-[#ff6a00] selection:text-white pt-20">
      <main className="flex-1 pb-12 px-6 max-w-[1400px] mx-auto w-full">
        <BotHeader />
        <PerformanceCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <EquityChart />
          <StrategyInfo />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PositionsTable />
          <SimilarBots />
        </div>
      </main>
    </div>
  );
}
