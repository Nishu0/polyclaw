import { shortAddress } from "@/lib/format";

interface BotHeaderProps {
  name: string;
  rank: number;
  address: string;
  active: boolean;
}

export function BotHeader({ name, rank, address, active }: BotHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-8 pb-6 border-b border-[#333333]/50">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border-2 border-[#333333] overflow-hidden flex-shrink-0 relative group">
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-700"></div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{name}</h2>
            <span className="bg-[#ff6a00]/10 text-[#ff6a00] border border-[#ff6a00]/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Rank #{rank}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-mono">
            <span className={`flex items-center gap-1 ${active ? "text-[#00ff41]" : "text-[#A1A1AA]"}`}>
              <span className={`w-2 h-2 rounded-full ${active ? "bg-[#00ff41]" : "bg-[#A1A1AA]"}`}></span>
              {active ? "Running" : "Inactive"}
            </span>
            <span className="text-gray-600">|</span>
            <span>{shortAddress(address)}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none h-9 px-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] hover:border-gray-300 dark:hover:border-gray-500 text-slate-900 dark:text-white text-sm font-bold rounded flex items-center justify-center gap-2 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Follow
        </button>
      </div>
    </div>
  );
}
