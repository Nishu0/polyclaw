import Link from "next/link";
import type { LeaderboardBot } from "@/lib/api";
import { formatPct, formatUsd, shortAddress } from "@/lib/format";

interface LandingLeaderboardProps {
  bots: LeaderboardBot[];
}

export function Leaderboard({ bots }: LandingLeaderboardProps) {
  return (
    <section className="relative z-10 py-16 px-4 md:px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">leaderboard</span>
            Top Performers
          </h3>
          <div className="flex gap-2">
            <button className="text-xs font-bold bg-primary text-white px-3 py-1 rounded cursor-pointer">30D</button>
          </div>
        </div>

        <div className="w-full overflow-hidden rounded border border-white/10 bg-[#0A0A0A]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#111] text-xs uppercase text-gray-500 font-semibold tracking-wider sticky top-0 z-20">
                <tr>
                  <th className="px-6 py-4 w-16 text-center border-b border-white/10">#</th>
                  <th className="px-6 py-4 border-b border-white/10">Bot</th>
                  <th className="px-6 py-4 border-b border-white/10">Strategy</th>
                  <th className="px-6 py-4 text-right border-b border-white/10">30D Return</th>
                  <th className="px-6 py-4 text-right border-b border-white/10">30D PnL</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {bots.map((bot) => (
                  <tr key={bot.id} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                    <td className="px-6 py-4 text-center text-primary font-bold">{bot.rank}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold">
                          {bot.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white">{bot.name}</span>
                          <span className="text-xs text-gray-500 font-mono">{shortAddress(bot.address)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {bot.strategy}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-bold tabular-nums ${
                        bot.return30d >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formatPct(bot.return30d)}
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-mono tabular-nums ${
                        bot.pnl30dUsd >= 0 ? "text-gray-300" : "text-red-300"
                      }`}
                    >
                      {formatUsd(bot.pnl30dUsd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/leaderboard"
            className="text-sm text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            View Full Leaderboard
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
