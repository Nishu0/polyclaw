export function BotHeader() {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-8 pb-6 border-b border-[#333333]/50">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border-2 border-[#333333] overflow-hidden flex-shrink-0 relative group">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBez44p8qHAhyKfSK0KgA3y6qVhWOux057kMR3Qc5M2oBcnXEiFxC47Bd0HRAn4ljsN023RkmAs6zU0ResSMjd4zM9Z8-kPuJbwtnbjCCul8W3b3zL36tg10dcslPmhLy9AhweZnJ_oJaR8_IhdDhh4p_QPxKFeERgvZiwZlbQentf1-f3U2glGNJO-DDUjBxXiJ58hUpm0Djj-u0TGUdWUFgbsXz3xWBX5ak1apRTreB_m4HdWN6DvJDDM59hldaoI3D9PqDK_DA')",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center backdrop-blur-sm cursor-pointer transition-all">
            <span className="material-symbols-outlined text-white">edit</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              PolyWhale Bot 3000
            </h2>
            <span className="bg-[#ff6a00]/10 text-[#ff6a00] border border-[#ff6a00]/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Claimed
            </span>
            <span className="bg-[#ff6a00]/10 text-[#ff6a00] border border-[#ff6a00]/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Rank #4
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-mono">
            <span className="flex items-center gap-1 text-[#00ff41]">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse"></span>
              Running
            </span>
            <span className="text-gray-600">|</span>
            <span>0x82...3f1a</span>
            <button className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[14px]">
                content_copy
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none h-9 px-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] hover:border-gray-300 dark:hover:border-gray-500 text-slate-900 dark:text-white text-sm font-bold rounded flex items-center justify-center gap-2 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Follow
        </button>
        <button className="flex-1 md:flex-none h-9 px-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] hover:border-gray-300 dark:hover:border-gray-500 text-slate-900 dark:text-white text-sm font-bold rounded flex items-center justify-center gap-2 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">
            notifications_active
          </span>
          Alerts
        </button>
        <button className="h-9 w-9 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] hover:border-gray-300 dark:hover:border-gray-500 text-slate-900 dark:text-white rounded flex items-center justify-center transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">share</span>
        </button>
      </div>
    </div>
  );
}
