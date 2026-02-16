"use client";

import { useState } from "react";

interface Bot {
  id: string;
  name: string;
  address: string;
  avatar: string;
  avatarColor: string;
  strategy: string;
  strategyColor: string;
  sevenDay: string;
  sevenDayColor: string;
  thirtyDay: string;
  thirtyDayPnL: string;
  drawdown: string;
  lastTrade: string;
  todayPnL: string;
  todayPnLColor: string;
}

const bots: Bot[] = [
  {
    id: "1",
    name: "Alpha Centauri",
    address: "0x7a...9b2",
    avatar: "MR",
    avatarColor: "from-purple-600 to-blue-600 text-white",
    strategy: "Mean Reversion",
    strategyColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    sevenDay: "+4.2%",
    sevenDayColor: "text-emerald-500",
    thirtyDay: "+18.5%",
    thirtyDayPnL: "+$2,450",
    drawdown: "3.2%",
    lastTrade: "2m ago",
    todayPnL: "+$120",
    todayPnLColor: "text-emerald-500",
  },
  {
    id: "2",
    name: "Delta Arbitrage",
    address: "0x3f...1c8",
    avatar: "AR",
    avatarColor: "from-[#ff6a00] to-rose-600 text-black",
    strategy: "Arbitrage",
    strategyColor: "bg-[#ff6a00]/10 text-[#ff6a00] border-[#ff6a00]/20",
    sevenDay: "-1.2%",
    sevenDayColor: "text-rose-500",
    thirtyDay: "+8.4%",
    thirtyDayPnL: "+$890",
    drawdown: "1.1%",
    lastTrade: "15m ago",
    todayPnL: "-$45",
    todayPnLColor: "text-rose-500",
  },
  {
    id: "3",
    name: "News Trading Beta",
    address: "0x1d...4a9",
    avatar: "NT",
    avatarColor: "from-cyan-600 to-teal-600 text-white",
    strategy: "News Trading",
    strategyColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    sevenDay: "+12.1%",
    sevenDayColor: "text-emerald-500",
    thirtyDay: "+45.2%",
    thirtyDayPnL: "+$8,100",
    drawdown: "8.5%",
    lastTrade: "1h ago",
    todayPnL: "+$1,200",
    todayPnLColor: "text-emerald-500",
  },
  {
    id: "4",
    name: "Liquidity Prov V3",
    address: "0x9e...2b1",
    avatar: "LQ",
    avatarColor: "from-yellow-600 to-orange-600 text-white",
    strategy: "Liquidity",
    strategyColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    sevenDay: "+0.5%",
    sevenDayColor: "text-emerald-500",
    thirtyDay: "+2.1%",
    thirtyDayPnL: "+$320",
    drawdown: "0.2%",
    lastTrade: "5m ago",
    todayPnL: "+$15",
    todayPnLColor: "text-emerald-500",
  },
];

export function WatchlistTable() {
  const [expandedBotId, setExpandedBotId] = useState<string | null>("2"); // Default to second bot expanded for demo

  const toggleExpand = (id: string) => {
    setExpandedBotId(expandedBotId === id ? null : id);
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-neutral-500 uppercase bg-[#1A1A1A] border-b border-white/10">
            <tr>
              <th className="px-6 py-3 font-medium w-[240px]">Bot</th>
              <th className="px-6 py-3 font-medium">Strategy</th>
              <th className="px-6 py-3 font-medium text-right">7D %</th>
              <th className="px-6 py-3 font-bold text-white text-right">
                30D %
              </th>
              <th className="px-6 py-3 font-medium text-right">30D PnL</th>
              <th className="px-6 py-3 font-medium text-right">Drawdown</th>
              <th className="px-6 py-3 font-medium text-right">Last Trade</th>
              <th className="px-6 py-3 font-medium text-right">Today</th>
              <th className="px-6 py-3 font-medium text-center w-[140px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bots.map((bot) => {
              const isExpanded = expandedBotId === bot.id;
              return (
                <>
                  <tr
                    key={bot.id}
                    className={`transition-colors cursor-pointer ${
                      isExpanded
                        ? "bg-[#1A1A1A] border-l-2 border-l-[#ff6a00]"
                        : "group hover:bg-white/[0.02]"
                    }`}
                    onClick={() => toggleExpand(bot.id)}
                  >
                    <td className={`px-6 ${isExpanded ? "py-4" : "py-3"}`}>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded bg-gradient-to-tr ${bot.avatarColor} flex items-center justify-center text-xs font-bold`}
                          title="Bot Avatar"
                        >
                          {bot.avatar}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-white">
                            {bot.name}
                          </span>
                          <span className="text-xs text-neutral-500 font-mono">
                            {bot.address}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 ${isExpanded ? "py-4" : "py-3"}`}>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs border ${bot.strategyColor}`}
                      >
                        {bot.strategy}
                      </span>
                    </td>
                    <td
                      className={`px-6 ${
                        isExpanded ? "py-4" : "py-3"
                      } text-right tabular-nums font-medium ${
                        bot.sevenDayColor
                      }`}
                    >
                      {bot.sevenDay}
                    </td>
                    <td
                      className={`px-6 ${
                        isExpanded ? "py-4" : "py-3"
                      } text-right tabular-nums text-emerald-500 font-bold text-base`}
                    >
                      {bot.thirtyDay}
                    </td>
                    <td
                      className={`px-6 ${
                        isExpanded ? "py-4" : "py-3"
                      } text-right tabular-nums text-emerald-500`}
                    >
                      {bot.thirtyDayPnL}
                    </td>
                    <td
                      className={`px-6 ${
                        isExpanded ? "py-4" : "py-3"
                      } text-right tabular-nums text-neutral-300`}
                    >
                      {bot.drawdown}
                    </td>
                    <td
                      className={`px-6 ${
                        isExpanded ? "py-4" : "py-3"
                      } text-right tabular-nums text-neutral-400`}
                    >
                      {bot.lastTrade}
                    </td>
                    <td
                      className={`px-6 ${
                        isExpanded ? "py-4" : "py-3"
                      } text-right tabular-nums font-medium ${
                        bot.todayPnLColor
                      }`}
                    >
                      {bot.todayPnL}
                    </td>
                    <td className={`px-6 ${isExpanded ? "py-4" : "py-3"}`}>
                      <div
                        className={`flex items-center justify-center gap-2 ${
                          isExpanded
                            ? ""
                            : "opacity-60 group-hover:opacity-100 transition-opacity"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className={`w-8 h-8 flex items-center justify-center rounded transition-colors cursor-pointer ${
                            isExpanded
                              ? "bg-[#ff6a00]/20 text-[#ff6a00]"
                              : "hover:bg-white/10 text-neutral-400 hover:text-[#ff6a00]"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(bot.id);
                          }}
                        >
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isExpanded ? "fill-1" : ""
                            }`}
                          >
                            {isExpanded ? "notifications" : "notifications_active"}
                          </span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">
                            open_in_new
                          </span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">
                            close
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Expanded Configuration Row */}
                  {isExpanded && (
                    <tr className="bg-[#1A1A1A] border-l-2 border-l-[#ff6a00]/50 animate-in fade-in slide-in-from-top-1 duration-200">
                      <td className="px-6 py-0" colSpan={9}>
                        <div className="py-4 pl-12 pr-4 border-t border-white/5 flex gap-8">
                          {/* Alert Settings Preview inside the expanded row */}
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#ff6a00] text-[18px]">
                                  tune
                                </span>
                                Alert Configuration for {bot.name}
                              </h4>
                              <div className="flex gap-2">
                                <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded transition-colors cursor-pointer">
                                  Reset
                                </button>
                                <button className="text-xs bg-[#ff6a00] hover:bg-[#ff6a00]/90 text-black font-medium px-3 py-1.5 rounded transition-colors cursor-pointer">
                                  Save Changes
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {/* Config Item 1 */}
                              <div className="bg-black/40 border border-white/5 p-3 rounded flex items-start gap-3">
                                <div className="mt-0.5 text-neutral-400">
                                  <span className="material-symbols-outlined text-[20px]">
                                    trending_down
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-neutral-200">
                                      Drawdown Threshold
                                    </span>
                                    <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#ff6a00]">
                                      <span className="translate-x-4 inline-block h-3.5 w-3.5 transform rounded-full bg-black transition"></span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2">
                                    <input
                                      className="w-16 bg-[#111111] border border-white/20 rounded px-2 py-1 text-xs text-white text-right focus:border-[#ff6a00] focus:ring-0"
                                      type="text"
                                      defaultValue="5.0"
                                    />
                                    <span className="text-xs text-neutral-500">
                                      %
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* Config Item 2 */}
                              <div className="bg-black/40 border border-white/5 p-3 rounded flex items-start gap-3">
                                <div className="mt-0.5 text-neutral-400">
                                  <span className="material-symbols-outlined text-[20px]">
                                    payments
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-neutral-200">
                                      PnL Milestone
                                    </span>
                                    <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-neutral-700">
                                      <span className="translate-x-1 inline-block h-3.5 w-3.5 transform rounded-full bg-white transition"></span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2 opacity-50">
                                    <input
                                      className="w-20 bg-[#111111] border border-white/10 rounded px-2 py-1 text-xs text-white text-right"
                                      disabled
                                      type="text"
                                      defaultValue="1000"
                                    />
                                    <span className="text-xs text-neutral-500">
                                      USDC
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* Config Item 3 */}
                              <div className="bg-black/40 border border-white/5 p-3 rounded flex items-start gap-3">
                                <div className="mt-0.5 text-neutral-400">
                                  <span className="material-symbols-outlined text-[20px]">
                                    mail
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-neutral-200">
                                      Email Alerts
                                    </span>
                                    <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#ff6a00]">
                                      <span className="translate-x-4 inline-block h-3.5 w-3.5 transform rounded-full bg-black transition"></span>
                                    </div>
                                  </div>
                                  <input
                                    className="mt-2 w-full bg-[#111111] border border-white/20 rounded px-2 py-1 text-xs text-white focus:border-[#ff6a00] focus:ring-0"
                                    type="email"
                                    defaultValue="trader@polymarket.com"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination / Footer */}
      <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between bg-[#1A1A1A]">
        <div className="text-xs text-neutral-400">Showing 1-4 of 8 bots</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-white/5 text-white/50 text-xs cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
