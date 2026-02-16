export function PositionsTable() {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] rounded overflow-hidden flex flex-col">
      <div className="flex border-b border-gray-200 dark:border-[#333333] px-4 bg-gray-50 dark:bg-[#0a0a0a]/50">
        <button className="relative py-4 px-2 mr-6 text-sm font-bold text-slate-900 dark:text-white border-b-2 border-[#ff6a00] cursor-pointer">
          Open Positions
          <span className="ml-1.5 bg-[#ff6a00] text-black text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
            3
          </span>
        </button>
        <button className="relative py-4 px-2 mr-6 text-sm font-bold text-gray-500 hover:text-slate-900 dark:hover:text-gray-300 transition-colors border-b-2 border-transparent cursor-pointer">
          Recent Trades
        </button>
        <button className="relative py-4 px-2 text-sm font-bold text-gray-500 hover:text-slate-900 dark:hover:text-gray-300 transition-colors border-b-2 border-transparent cursor-pointer">
          Orders
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
              <th className="px-4 py-3 font-semibold text-right">
                Unrealized PnL
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#333333]/50 text-sm font-medium">
            <tr className="hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group cursor-pointer">
              <td className="px-4 py-3 text-slate-900 dark:text-white">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px]">
                    🇺🇸
                  </div>
                  <span>Trump vs Biden 2024</span>
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                  Long
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-400 font-mono tabular-nums">
                $0.42
              </td>
              <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-mono tabular-nums">
                $0.45
              </td>
              <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-mono tabular-nums">
                $5,000
              </td>
              <td className="px-4 py-3 text-right text-[#00ff41] font-mono tabular-nums font-bold">
                +$340.50
              </td>
            </tr>
            <tr className="hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group cursor-pointer">
              <td className="px-4 py-3 text-slate-900 dark:text-white">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px]">
                    ₿
                  </div>
                  <span>BTC &gt; $100k by Dec</span>
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="bg-[#ff3b30]/10 text-[#ff3b30] border border-[#ff3b30]/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                  Short
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-400 font-mono tabular-nums">
                $0.12
              </td>
              <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-mono tabular-nums">
                $0.10
              </td>
              <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-mono tabular-nums">
                $2,400
              </td>
              <td className="px-4 py-3 text-right text-[#00ff41] font-mono tabular-nums font-bold">
                +$80.20
              </td>
            </tr>
            <tr className="hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group cursor-pointer">
              <td className="px-4 py-3 text-slate-900 dark:text-white">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px]">
                    🏦
                  </div>
                  <span>Fed Rate Cut in June</span>
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                  Long
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-400 font-mono tabular-nums">
                $0.65
              </td>
              <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-mono tabular-nums">
                $0.61
              </td>
              <td className="px-4 py-3 text-right text-slate-900 dark:text-white font-mono tabular-nums">
                $10,000
              </td>
              <td className="px-4 py-3 text-right text-[#ff3b30] font-mono tabular-nums font-bold">
                -$400.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-auto border-t border-gray-200 dark:border-[#333333] p-3 flex justify-center">
        <button className="text-xs font-bold text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
          VIEW ALL POSITIONS{" "}
          <span className="material-symbols-outlined text-[14px]">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
