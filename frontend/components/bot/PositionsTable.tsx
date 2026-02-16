import type { BotPosition } from "@/lib/api";
import { formatUsd } from "@/lib/format";

interface PositionsTableProps {
  positions: BotPosition[];
}

export function PositionsTable({ positions }: PositionsTableProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] rounded overflow-hidden flex flex-col">
      <div className="flex border-b border-gray-200 dark:border-[#333333] px-4 bg-gray-50 dark:bg-[#0a0a0a]/50">
        <button className="relative py-4 px-2 mr-6 text-sm font-bold text-slate-900 dark:text-white border-b-2 border-[#ff6a00] cursor-pointer">
          Open Positions
          <span className="ml-1.5 bg-[#ff6a00] text-black text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
            {positions.length}
          </span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-[#333333] text-[11px] uppercase tracking-wider text-gray-500 bg-gray-50 dark:bg-[#0a0a0a]/30">
              <th className="px-4 py-3 font-semibold">Market</th>
              <th className="px-4 py-3 font-semibold text-center">Side</th>
              <th className="px-4 py-3 font-semibold text-right">Entry</th>
              <th className="px-4 py-3 font-semibold text-right">Current</th>
              <th className="px-4 py-3 font-semibold text-right">Size</th>
              <th className="px-4 py-3 font-semibold text-right">Unrealized PnL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#333333]/50 text-sm font-medium">
            {positions.map((position) => (
              <tr key={position.id} className="hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                <td className="px-4 py-3 text-slate-900 dark:text-white">{position.market}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                      position.side === "LONG"
                        ? "bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/20"
                        : "bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/20"
                    }`}
                  >
                    {position.side}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-gray-400 font-mono tabular-nums">${position.entryPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-mono tabular-nums">${position.currentPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-mono tabular-nums">{formatUsd(position.sizeUsd)}</td>
                <td
                  className={`px-4 py-3 text-right font-mono tabular-nums font-bold ${
                    position.unrealizedPnlUsd >= 0 ? "text-[#00ff41]" : "text-[#ff3b30]"
                  }`}
                >
                  {formatUsd(position.unrealizedPnlUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
