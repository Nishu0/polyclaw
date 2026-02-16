export function EquityChart() {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] rounded p-5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">
            Equity Curve
          </h3>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
              $124,592.44
            </span>
            <span className="text-sm font-medium text-[#00ff41] bg-[#00ff41]/10 px-1.5 rounded">
              +15.3% (7D)
            </span>
          </div>
        </div>
        <div className="flex bg-gray-100 dark:bg-[#0a0a0a] p-0.5 rounded border border-gray-200 dark:border-[#333333]">
          <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
            7D
          </button>
          <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-[#333333] text-slate-900 dark:text-white rounded shadow-sm cursor-pointer">
            30D
          </button>
          <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
            90D
          </button>
          <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
            ALL
          </button>
        </div>
      </div>
      <div className="h-[280px] w-full relative group">
        {/* Hover Crosshair (Hidden by default, shown on hover/mockup) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600 border-r border-dashed border-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-600 border-b border-dashed border-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"></div>
        <div className="absolute left-[50%] top-[30%] bg-black border border-[#333333] p-2 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          <p className="text-xs text-gray-400">May 12, 14:00</p>
          <p className="text-sm font-bold text-white">$118,402</p>
        </div>
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.2"></stop>
              <stop offset="100%" stopColor="#ff6a00" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          {/* Grid Lines */}
          <line
            stroke="#333"
            strokeDasharray="2"
            strokeWidth="0.1"
            x1="0"
            x2="100"
            y1="25"
            y2="25"
          ></line>
          <line
            stroke="#333"
            strokeDasharray="2"
            strokeWidth="0.1"
            x1="0"
            x2="100"
            y1="50"
            y2="50"
          ></line>
          <line
            stroke="#333"
            strokeDasharray="2"
            strokeWidth="0.1"
            x1="0"
            x2="100"
            y1="75"
            y2="75"
          ></line>
          {/* Area */}
          <path
            d="M0 80 C 10 75, 20 78, 30 65 C 40 55, 50 60, 60 45 C 70 40, 80 42, 90 20 L 100 15 L 100 100 L 0 100 Z"
            fill="url(#chartGradient)"
          ></path>
          {/* Line */}
          <path
            d="M0 80 C 10 75, 20 78, 30 65 C 40 55, 50 60, 60 45 C 70 40, 80 42, 90 20 L 100 15"
            fill="none"
            stroke="#ff6a00"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          ></path>
        </svg>
      </div>
    </div>
  );
}
