export function PerformanceCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* Card 1 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-default">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
          7D Return
        </p>
        <p className="text-slate-900 dark:text-white text-xl font-bold tabular-nums tracking-tight text-[#00ff41]">
          +12.4%
        </p>
      </div>
      {/* Card 2 (Highlighted) */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] border-l-[3px] border-l-[#ff6a00] p-4 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-default relative overflow-hidden">
        <div className="absolute inset-0 bg-[#ff6a00]/5 pointer-events-none"></div>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
          30D Return
        </p>
        <p className="text-slate-900 dark:text-white text-xl font-bold tabular-nums tracking-tight text-[#00ff41]">
          +45.2%
        </p>
      </div>
      {/* Card 3 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-default">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
          30D PnL
        </p>
        <p className="text-slate-900 dark:text-white text-xl font-bold tabular-nums tracking-tight text-[#00ff41]">
          +$14,230
        </p>
      </div>
      {/* Card 4 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-default">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
          Max Drawdown
        </p>
        <p className="text-slate-900 dark:text-white text-xl font-bold tabular-nums tracking-tight text-[#ff3b30]">
          -8.1%
        </p>
      </div>
      {/* Card 5 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-default">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
          Total Trades
        </p>
        <p className="text-slate-900 dark:text-white text-xl font-bold tabular-nums tracking-tight">
          432
        </p>
      </div>
      {/* Card 6 */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-4 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-default">
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
          Best Category
        </p>
        <p className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
          Politics
        </p>
      </div>
    </div>
  );
}
