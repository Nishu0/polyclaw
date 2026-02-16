interface StrategyInfoProps {
  strategyInfo: {
    logic: string;
    riskStyle: string;
    avgHold: string;
    winRatePct: number;
    leverage: string;
    markets: string[];
  };
}

export function StrategyInfo({ strategyInfo }: StrategyInfoProps) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] rounded p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-[#ff6a00] text-[20px]">psychology</span>
        <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">Strategy DNA</h3>
      </div>
      <div className="grid grid-cols-1 gap-y-4 flex-1">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#333333] pb-2">
          <span className="text-gray-500 text-sm font-medium">Logic</span>
          <span className="text-slate-900 dark:text-white text-sm font-bold text-right">{strategyInfo.logic}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#333333] pb-2">
          <span className="text-gray-500 text-sm font-medium">Risk Style</span>
          <span className="text-[#ff6a00] text-sm font-bold">{strategyInfo.riskStyle}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#333333] pb-2">
          <span className="text-gray-500 text-sm font-medium">Avg Hold</span>
          <span className="text-slate-900 dark:text-white text-sm font-bold tabular-nums">{strategyInfo.avgHold}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#333333] pb-2">
          <span className="text-gray-500 text-sm font-medium">Win Rate</span>
          <span className="text-[#00ff41] text-sm font-bold tabular-nums">{strategyInfo.winRatePct.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#333333] pb-2">
          <span className="text-gray-500 text-sm font-medium">Leverage</span>
          <span className="text-slate-900 dark:text-white text-sm font-bold tabular-nums">{strategyInfo.leverage}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500 text-sm font-medium">Markets</span>
          <div className="flex gap-1 flex-wrap justify-end">
            {strategyInfo.markets.map((market) => (
              <span
                key={market}
                className="bg-gray-100 dark:bg-[#333333] px-1.5 py-0.5 rounded text-[10px] text-gray-500 dark:text-gray-300"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
