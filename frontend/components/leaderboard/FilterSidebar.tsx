export function FilterSidebar() {
  return (
    <aside className="w-[260px] bg-background-dark border-r border-[#1A1A1A] flex flex-col shrink-0 overflow-y-auto">
      <div className="p-4 flex flex-col gap-6">
        {/* Category Filter */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
              Category
            </h3>
          </div>
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-3 p-2 rounded hover:bg-[#0A0A0A] cursor-pointer group">
              <input
                defaultChecked
                className="rounded border-[#1A1A1A] bg-[#0A0A0A] text-[#ff6a00] focus:ring-0 focus:ring-offset-0"
                type="checkbox"
              />
              <span className="text-sm font-medium text-white group-hover:text-[#ff6a00] transition-colors">
                All Categories
              </span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded hover:bg-[#0A0A0A] cursor-pointer group">
              <input
                className="rounded border-[#1A1A1A] bg-[#0A0A0A] text-[#ff6a00] focus:ring-0 focus:ring-offset-0"
                type="checkbox"
              />
              <span className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors">
                Arbitrage
              </span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded hover:bg-[#0A0A0A] cursor-pointer group">
              <input
                className="rounded border-[#1A1A1A] bg-[#0A0A0A] text-[#ff6a00] focus:ring-0 focus:ring-offset-0"
                type="checkbox"
              />
              <span className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors">
                Market Making
              </span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded hover:bg-[#0A0A0A] cursor-pointer group">
              <input
                className="rounded border-[#1A1A1A] bg-[#0A0A0A] text-[#ff6a00] focus:ring-0 focus:ring-offset-0"
                type="checkbox"
              />
              <span className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors">
                Trend Following
              </span>
            </label>
          </div>
        </div>
        <div className="h-px bg-[#1A1A1A] w-full"></div>
        {/* Filters */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
            Filters
          </h3>
          {/* Verified Only */}
          <div className="flex items-center justify-between p-2 rounded bg-[#0A0A0A] border border-[#1A1A1A]">
            <span className="text-sm font-medium text-white">Verified Only</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#1A1A1A] checked:right-0 checked:border-[#ff6a00]"
                id="toggle"
                name="toggle"
                type="checkbox"
              />
              <label
                className="toggle-label block overflow-hidden h-5 rounded-full bg-[#1A1A1A] cursor-pointer border border-[#1A1A1A]"
                htmlFor="toggle"
              ></label>
            </div>
          </div>
          {/* Min Trades */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs text-[#A1A1AA]">Min Trades</span>
            <div className="flex gap-2">
              <input
                className="w-full h-9 bg-[#0A0A0A] border border-[#1A1A1A] rounded px-3 text-sm text-white focus:border-[#ff6a00] focus:ring-0"
                placeholder="0"
                type="number"
              />
            </div>
          </div>
          {/* Max Drawdown */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#A1A1AA]">Max Drawdown</span>
            <div className="flex items-center gap-2">
              <input
                className="w-full h-1 bg-[#1A1A1A] rounded-lg appearance-none cursor-pointer accent-[#ff6a00]"
                max="100"
                min="0"
                type="range"
                defaultValue="20"
              />
              <span className="text-xs font-mono text-[#ff6a00] w-8 text-right">
                20%
              </span>
            </div>
          </div>
        </div>
        <div className="h-px bg-[#1A1A1A] w-full"></div>
        {/* Timeframe */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
            Timeframe
          </h3>
          <div className="grid grid-cols-4 gap-1 bg-[#0A0A0A] p-1 rounded border border-[#1A1A1A]">
            <button className="text-xs font-medium py-1 rounded text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A] cursor-pointer">
              1D
            </button>
            <button className="text-xs font-medium py-1 rounded text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A] cursor-pointer">
              7D
            </button>
            <button className="text-xs font-medium py-1 rounded bg-[#ff6a00] text-white shadow-sm cursor-pointer">
              30D
            </button>
            <button className="text-xs font-medium py-1 rounded text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A] cursor-pointer">
              All
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto p-4 border-t border-[#1A1A1A]">
        <button className="w-full flex items-center justify-center rounded h-9 px-4 border border-[#1A1A1A] hover:border-[#A1A1AA] text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors cursor-pointer">
          Reset Filters
        </button>
      </div>
    </aside>
  );
}
