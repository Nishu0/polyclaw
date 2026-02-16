import Link from "next/link";
import type { LeaderboardBot } from "@/lib/api";
import { formatPct } from "@/lib/format";

interface SimilarBotsProps {
  bots: LeaderboardBot[];
}

export function SimilarBots({ bots }: SimilarBotsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider">
          Similar Strategies
        </h3>
      </div>

      {bots.map((bot) => (
        <Link
          href={`/${bot.id}`}
          key={bot.id}
          className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] p-3 rounded flex items-center gap-3 hover:border-gray-500 transition-colors group cursor-pointer"
        >
          <div className="w-10 h-10 rounded bg-gradient-to-br from-orange-500 to-yellow-700 border border-gray-200 dark:border-[#333333]"></div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <p className="text-slate-900 dark:text-white text-sm font-bold truncate">{bot.name}</p>
              <p className={`text-xs font-mono font-bold ${bot.return30d >= 0 ? "text-[#00ff41]" : "text-[#ff3b30]"}`}>
                {formatPct(bot.return30d)}
              </p>
            </div>
            <p className="text-gray-500 text-xs truncate">{bot.strategy}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
