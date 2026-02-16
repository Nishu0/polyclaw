export function StatsHeader() {
  return (
    <div className="flex flex-col bg-background-dark z-10">
      <div className="p-6 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Leaderboard
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#A1A1AA]">Sort by:</span>
            <div className="relative group">
              <button className="flex items-center gap-2 h-9 px-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded text-sm font-medium hover:border-[#ff6a00] transition-colors text-white cursor-pointer">
                30D Return
                <span className="material-symbols-outlined text-[16px]">
                  expand_more
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Tabs & Stats Row */}
        <div className="flex flex-col xl:flex-row gap-6 justify-between items-end border-b border-[#1A1A1A] pb-0">
          {/* Tabs */}
          <div className="flex gap-6 relative top-[1px]">
            <button className="pb-3 text-sm font-bold text-[#ff6a00] border-b-2 border-[#ff6a00] flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">
                trophy
              </span>
              Top
            </button>
            <button className="pb-3 text-sm font-medium text-[#A1A1AA] hover:text-white border-b-2 border-transparent hover:border-[#1A1A1A] transition-colors flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">
                new_releases
              </span>
              New
            </button>
            <button className="pb-3 text-sm font-medium text-[#A1A1AA] hover:text-white border-b-2 border-transparent hover:border-[#1A1A1A] transition-colors flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">
                trending_up
              </span>
              Consistent
            </button>
            <button className="pb-3 text-sm font-medium text-[#A1A1AA] hover:text-white border-b-2 border-transparent hover:border-[#1A1A1A] transition-colors flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">
                star
              </span>
              Most Followed
            </button>
          </div>
          {/* Stats Bar */}
          <div className="flex items-center divide-x divide-[#1A1A1A] pb-3 w-full xl:w-auto overflow-x-auto">
            <div className="px-4 first:pl-0">
              <p className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                Total Bots
              </p>
              <p className="text-lg font-bold font-mono text-white">312</p>
            </div>
            <div className="px-4">
              <p className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                24H Volume
              </p>
              <p className="text-lg font-bold font-mono text-white">$2.4M</p>
            </div>
            <div className="px-4">
              <p className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                Avg 30D
              </p>
              <p className="text-lg font-bold font-mono text-[#22c55e]">
                +12.5%
              </p>
            </div>
            <div className="px-4 last:pr-0">
              <p className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-semibold">
                Top Performer
              </p>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                <p className="text-sm font-bold truncate max-w-[100px] text-white">
                  Molt_Alpha
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
