import type { LeaderboardBot } from "@/lib/api";
import { formatPct, formatUsd, shortAddress, timeAgo } from "@/lib/format";

interface BotTableProps {
  bots: LeaderboardBot[];
  total: number;
  offset: number;
}

export function BotTable({ bots, total, offset }: BotTableProps) {
  const start = Math.min(offset + 1, total);
  const end = Math.min(offset + bots.length, total);

  return (
    <>
      <div className="flex-1 overflow-x-auto relative">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="bg-[#0A0A0A] sticky top-0 z-10 text-xs font-bold uppercase text-[#A1A1AA] tracking-wider">
            <tr>
              <th className="px-4 py-3 border-b border-[#1A1A1A] w-[60px] text-center">Rank</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] w-[240px]">Bot</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A]">Strategy</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">7D %</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">30D %</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">30D PnL</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">Drawdown</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">Trades</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">Win %</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">Active</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-[#1A1A1A]">
            {bots.map((bot) => (
              <tr key={bot.id} className="hover:bg-[#0A0A0A]/50 transition-colors group">
                <td className="px-4 py-4 text-center font-bold text-[#ff6a00] font-mono text-lg">{bot.rank}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-400 to-orange-600 flex-shrink-0 relative">
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
                          bot.active ? "bg-[#22c55e]" : "bg-[#A1A1AA]"
                        }`}
                      ></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold leading-none mb-1">{bot.name}</span>
                      <span className="text-xs text-[#A1A1AA] font-mono">{shortAddress(bot.address)}</span>
                    </div>
                    {bot.verified && (
                      <span className="material-symbols-outlined text-[#ff6a00] text-[16px]" title="Verified">
                        verified
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-[#1A1A1A] text-xs text-[#A1A1AA] border border-[#1A1A1A]">
                    {bot.strategy}
                  </span>
                </td>
                <td className={`px-4 py-4 text-right font-mono tabular-nums ${bot.return7d >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {formatPct(bot.return7d)}
                </td>
                <td className={`px-4 py-4 text-right font-mono tabular-nums font-bold text-base ${bot.return30d >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {formatPct(bot.return30d)}
                </td>
                <td className={`px-4 py-4 text-right font-mono tabular-nums ${bot.pnl30dUsd >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {formatUsd(bot.pnl30dUsd)}
                </td>
                <td className="px-4 py-4 text-right font-mono tabular-nums text-[#A1A1AA]">{Math.abs(bot.maxDrawdownPct).toFixed(1)}%</td>
                <td className="px-4 py-4 text-right font-mono tabular-nums text-white">{bot.totalTrades.toLocaleString()}</td>
                <td className="px-4 py-4 text-right font-mono tabular-nums text-white">{bot.winRatePct.toFixed(1)}%</td>
                <td className="px-4 py-4 text-right text-xs text-[#A1A1AA]">{timeAgo(bot.lastActiveAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="h-[60px] border-t border-[#1A1A1A] bg-background-dark flex items-center justify-between px-6 shrink-0 z-20">
        <span className="text-sm text-[#A1A1AA]">
          Showing <span className="text-white font-medium">{start}-{end}</span> of <span className="text-white font-medium">{total}</span> bots
        </span>
      </div>
    </>
  );
}
