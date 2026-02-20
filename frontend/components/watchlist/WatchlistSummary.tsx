import type { WatchlistSummaryData } from "@/lib/api";
import { formatPct, formatUsd } from "@/lib/format";

interface WatchlistSummaryProps {
  summary: WatchlistSummaryData;
}

export function WatchlistSummary({ summary }: WatchlistSummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 bg-[#111111] border border-white/10 rounded-lg divide-y md:divide-y-0 md:divide-x divide-white/10">
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Active Bots
        </span>
        <span className="text-2xl font-bold text-white tabular-nums">
          {summary.activeBots}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Total PnL (30D)
        </span>
        <div className="flex items-baseline gap-2">
          <span
            className={`text-2xl font-bold tabular-nums ${
              summary.totalPnl30dUsd >= 0 ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {formatUsd(summary.totalPnl30dUsd)}
          </span>
          <span
            className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              summary.avgReturn30dPct >= 0
                ? "text-emerald-500 bg-emerald-500/10"
                : "text-rose-500 bg-rose-500/10"
            }`}
          >
            {formatPct(summary.avgReturn30dPct)}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Avg Win Rate
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tabular-nums">
            {summary.avgWinRatePct.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Volume (24H)
        </span>
        <span className="text-2xl font-bold text-white tabular-nums">
          {formatUsd(summary.totalVolumeUsd)}
        </span>
      </div>
    </div>
  );
}
