export function WatchlistSummary() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 bg-[#111111] border border-white/10 rounded-lg divide-y md:divide-y-0 md:divide-x divide-white/10">
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Active Bots
        </span>
        <span className="text-2xl font-bold text-white tabular-nums">8</span>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Total PnL (30D)
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-emerald-500 tabular-nums">
            +$12,840
          </span>
          <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            +12.4%
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Win Rate
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tabular-nums">
            64.2%
          </span>
          <span className="text-xs font-medium text-emerald-500">+2.1%</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Volume Traded
        </span>
        <span className="text-2xl font-bold text-white tabular-nums">
          $1.2M
        </span>
      </div>
    </div>
  );
}
