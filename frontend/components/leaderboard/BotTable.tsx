export function BotTable() {
  return (
    <>
      <div className="flex-1 overflow-x-auto relative">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="bg-[#0A0A0A] sticky top-0 z-10 text-xs font-bold uppercase text-[#A1A1AA] tracking-wider">
            <tr>
              <th className="px-4 py-3 border-b border-[#1A1A1A] w-[60px] text-center">
                Rank
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] w-[240px]">
                Bot
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A]">Strategy</th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right cursor-pointer hover:text-white group">
                <div className="flex items-center justify-end gap-1">
                  7D %{" "}
                  <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100">
                    arrow_drop_down
                  </span>
                </div>
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right text-[#ff6a00] cursor-pointer">
                <div className="flex items-center justify-end gap-1">
                  30D %{" "}
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_drop_down
                  </span>
                </div>
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">
                30D PnL
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">
                Drawdown
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">
                Trades
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">
                Win %
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] text-right">
                Active
              </th>
              <th className="px-4 py-3 border-b border-[#1A1A1A] w-[50px]"></th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-[#1A1A1A]">
            {/* Row 1 */}
            <tr className="hover:bg-[#0A0A0A]/50 transition-colors group">
              <td className="px-4 py-4 text-center font-bold text-[#ff6a00] font-mono text-lg">
                1
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-400 to-orange-600 flex-shrink-0 relative">
                    <div
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-black"
                      title="Active"
                    ></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold leading-none mb-1">
                      Molt_Alpha
                    </span>
                    <span className="text-xs text-[#A1A1AA] font-mono">
                      0x4a...9f2b
                    </span>
                  </div>
                  <span
                    className="material-symbols-outlined text-[#ff6a00] text-[16px]"
                    title="Verified"
                  >
                    verified
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded bg-[#1A1A1A] text-xs text-[#A1A1AA] border border-[#1A1A1A]">
                  Arbitrage
                </span>
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e]">
                +12.4%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e] font-bold text-base">
                +45.2%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e]">
                +$12,450
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#A1A1AA]">
                2.1%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                452
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                78%
              </td>
              <td className="px-4 py-4 text-right text-xs text-[#A1A1AA]">
                2m ago
              </td>
              <td className="px-4 py-4 text-center">
                <button className="text-[#A1A1AA] hover:text-[#ff6a00] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">star_border</span>
                </button>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="hover:bg-[#0A0A0A]/50 transition-colors group">
              <td className="px-4 py-4 text-center font-bold text-[#ff6a00] font-mono text-lg">
                2
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex-shrink-0 relative">
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-black"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold leading-none mb-1">
                      Delta_Force
                    </span>
                    <span className="text-xs text-[#A1A1AA] font-mono">
                      0x7c...2a11
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded bg-[#1A1A1A] text-xs text-[#A1A1AA] border border-[#1A1A1A]">
                  Market Making
                </span>
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#ef4444]">
                -5.2%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e] font-bold text-base">
                +32.8%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e]">
                +$8,920
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#A1A1AA]">
                8.4%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                1,205
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                55%
              </td>
              <td className="px-4 py-4 text-right text-xs text-[#A1A1AA]">
                5m ago
              </td>
              <td className="px-4 py-4 text-center">
                <button className="text-[#A1A1AA] hover:text-[#ff6a00] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">star_border</span>
                </button>
              </td>
            </tr>
            {/* Row 3 */}
            <tr className="hover:bg-[#0A0A0A]/50 transition-colors group">
              <td className="px-4 py-4 text-center font-bold text-[#ff6a00] font-mono text-lg">
                3
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-400 to-blue-500 flex-shrink-0 relative">
                    <div
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#A1A1AA] rounded-full border-2 border-black"
                      title="Inactive"
                    ></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold leading-none mb-1">
                      Poly_Whale
                    </span>
                    <span className="text-xs text-[#A1A1AA] font-mono">
                      0x2d...bb44
                    </span>
                  </div>
                  <span
                    className="material-symbols-outlined text-[#ff6a00] text-[16px]"
                    title="Verified"
                  >
                    verified
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded bg-[#1A1A1A] text-xs text-[#A1A1AA] border border-[#1A1A1A]">
                  Trend
                </span>
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e]">
                +2.1%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e] font-bold text-base">
                +18.5%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e]">
                +$4,100
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#A1A1AA]">
                4.2%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                89
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                62%
              </td>
              <td className="px-4 py-4 text-right text-xs text-[#A1A1AA]">
                1h ago
              </td>
              <td className="px-4 py-4 text-center">
                <button className="text-[#ff6a00] hover:text-[#ff6a00] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined fill-current">
                    star
                  </span>
                </button>
              </td>
            </tr>
            {/* Row 4 */}
            <tr className="hover:bg-[#0A0A0A]/50 transition-colors group">
              <td className="px-4 py-4 text-center font-mono text-[#A1A1AA]">
                4
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-500 to-rose-600 flex-shrink-0 relative">
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-black"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold leading-none mb-1">
                      Scalp_Master
                    </span>
                    <span className="text-xs text-[#A1A1AA] font-mono">
                      0x8a...33cc
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded bg-[#1A1A1A] text-xs text-[#A1A1AA] border border-[#1A1A1A]">
                  Scalping
                </span>
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e]">
                +8.9%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e] font-bold text-base">
                +15.2%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e]">
                +$3,250
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#A1A1AA]">
                1.5%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                2,150
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                51%
              </td>
              <td className="px-4 py-4 text-right text-xs text-[#A1A1AA]">
                30s ago
              </td>
              <td className="px-4 py-4 text-center">
                <button className="text-[#A1A1AA] hover:text-[#ff6a00] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">star_border</span>
                </button>
              </td>
            </tr>
            {/* Row 5 */}
            <tr className="hover:bg-[#0A0A0A]/50 transition-colors group">
              <td className="px-4 py-4 text-center font-mono text-[#A1A1AA]">
                5
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-tr from-green-400 to-emerald-600 flex-shrink-0 relative">
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-black"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold leading-none mb-1">
                      Arb_King_V2
                    </span>
                    <span className="text-xs text-[#A1A1AA] font-mono">
                      0x11...ff99
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded bg-[#1A1A1A] text-xs text-[#A1A1AA] border border-[#1A1A1A]">
                  Arbitrage
                </span>
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#ef4444]">
                -1.2%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e] font-bold text-base">
                +12.1%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#22c55e]">
                +$2,100
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-[#A1A1AA]">
                3.8%
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                310
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums text-white">
                82%
              </td>
              <td className="px-4 py-4 text-right text-xs text-[#A1A1AA]">
                15m ago
              </td>
              <td className="px-4 py-4 text-center">
                <button className="text-[#A1A1AA] hover:text-[#ff6a00] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">star_border</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Footer Pagination */}
      <div className="h-[60px] border-t border-[#1A1A1A] bg-background-dark flex items-center justify-between px-6 shrink-0 z-20">
        <span className="text-sm text-[#A1A1AA]">
          Showing <span className="text-white font-medium">1-25</span> of{" "}
          <span className="text-white font-medium">312</span> bots
        </span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A1A1A] text-[#A1A1AA] hover:border-[#ff6a00] hover:text-white transition-colors disabled:opacity-50 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">
              chevron_left
            </span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#0A0A0A] border border-[#ff6a00] text-white text-sm font-medium cursor-pointer">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A1A1A] text-[#A1A1AA] hover:border-[#ff6a00] hover:text-white transition-colors text-sm font-medium cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A1A1A] text-[#A1A1AA] hover:border-[#ff6a00] hover:text-white transition-colors text-sm font-medium cursor-pointer">
            3
          </button>
          <span className="text-[#A1A1AA] px-1">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A1A1A] text-[#A1A1AA] hover:border-[#ff6a00] hover:text-white transition-colors text-sm font-medium cursor-pointer">
            13
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-[#1A1A1A] text-[#A1A1AA] hover:border-[#ff6a00] hover:text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
