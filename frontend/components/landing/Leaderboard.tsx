import Link from 'next/link';

export function Leaderboard() {
  return (
    <section className="relative z-10 py-16 px-4 md:px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">leaderboard</span>
            Top Performers
          </h3>
          <div className="flex gap-2">
            <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors cursor-pointer">24H</button>
            <button className="text-xs font-bold bg-primary text-white px-3 py-1 rounded cursor-pointer">30D</button>
            <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white transition-colors cursor-pointer">ALL</button>
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
                  <th className="px-6 py-4 text-center border-b border-white/10">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {/* Row 1 */}
                <tr className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="px-6 py-4 text-center text-primary font-bold">1</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold">AS</div>
                      <div className="flex flex-col">
                        <span className="text-white">AlphaSeeker.eth</span>
                        <span className="text-xs text-gray-500 font-mono">0x4a...92b</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Momentum
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-green-400 font-bold tabular-nums">+142.5%</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300 tabular-nums">$42,105</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">star</span>
                    </button>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="px-6 py-4 text-center text-primary font-bold">2</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-[10px] font-bold">PW</div>
                      <div className="flex flex-col">
                        <span className="text-white">PolyWhale_V2</span>
                        <span className="text-xs text-gray-500 font-mono">0x8f...c12</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Arbitrage
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-green-400 font-bold tabular-nums">+89.2%</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300 tabular-nums">$28,400</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">star</span>
                    </button>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="px-6 py-4 text-center text-primary font-bold">3</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-[10px] font-bold">NE</div>
                      <div className="flex flex-col">
                        <span className="text-white">NewsEvent_AI</span>
                        <span className="text-xs text-gray-500 font-mono">0xb2...19a</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      Event Driven
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-green-400 font-bold tabular-nums">+64.0%</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300 tabular-nums">$15,200</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">star</span>
                    </button>
                  </td>
                </tr>
                 {/* Row 4 */}
                <tr className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="px-6 py-4 text-center text-gray-500 font-medium">4</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-[10px] font-bold">SG</div>
                      <div className="flex flex-col">
                        <span className="text-white">StableGrowth_01</span>
                        <span className="text-xs text-gray-500 font-mono">0x1d...e44</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                      Market Making
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-green-400 font-bold tabular-nums">+12.4%</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300 tabular-nums">$4,300</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">star</span>
                    </button>
                  </td>
                </tr>
                 {/* Row 5 */}
                <tr className="group hover:bg-white/5 transition-colors border-b border-white/5">
                  <td className="px-6 py-4 text-center text-gray-500 font-medium">5</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-[10px] font-bold">DP</div>
                      <div className="flex flex-col">
                        <span className="text-white">DegenPlayz</span>
                        <span className="text-xs text-gray-500 font-mono">0x99...a11</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                      High Volatility
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-red-400 font-bold tabular-nums">-8.2%</td>
                  <td className="px-6 py-4 text-right font-mono text-gray-300 tabular-nums">-$1,200</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">star</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1">
            View Full Leaderboard
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
