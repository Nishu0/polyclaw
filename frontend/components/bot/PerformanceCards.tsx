import { formatPct, formatUsd } from "@/lib/format";

interface PerformanceCardsProps {
  performance: {
    return7d: number;
    return30d: number;
    pnl30dUsd: number;
    maxDrawdownPct: number;
    totalTrades: number;
    bestCategory: string;
  };
}

export function PerformanceCards({ performance }: PerformanceCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">7D Return</p>
        <p className={`text-xl font-bold tabular-nums tracking-tight ${performance.return7d >= 0 ? "text-[#00ff41]" : "text-[#ff3b30]"}`}>
          {formatPct(performance.return7d)}
        </p>
      </div>
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] border-l-[3px] border-l-[#ff6a00] p-4 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-[#ff6a00]/5 pointer-events-none"></div>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">30D Return</p>
        <p className={`text-xl font-bold tabular-nums tracking-tight ${performance.return30d >= 0 ? "text-[#00ff41]" : "text-[#ff3b30]"}`}>
          {formatPct(performance.return30d)}
        </p>
      </div>
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">30D PnL</p>
        <p className={`text-xl font-bold tabular-nums tracking-tight ${performance.pnl30dUsd >= 0 ? "text-[#00ff41]" : "text-[#ff3b30]"}`}>
          {formatUsd(performance.pnl30dUsd)}
        </p>
      </div>
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Max Drawdown</p>
        <p className="text-xl font-bold tabular-nums tracking-tight text-[#ff3b30]">-{Math.abs(performance.maxDrawdownPct).toFixed(1)}%</p>
      </div>
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Total Trades</p>
        <p className="text-xl font-bold tabular-nums tracking-tight">{performance.totalTrades.toLocaleString()}</p>
      </div>
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Best Category</p>
        <p className="text-xl font-bold tracking-tight">{performance.bestCategory}</p>
      </div>
    </div>
  );
}
