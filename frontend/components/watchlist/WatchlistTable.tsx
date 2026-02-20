"use client";

import { useState } from "react";
import type { WatchlistBot } from "@/lib/api";
import { formatPct, formatUsd, timeAgo } from "@/lib/format";

interface WatchlistTableProps {
  bots: WatchlistBot[];
}

export function WatchlistTable({ bots }: WatchlistTableProps) {
  const [expandedBotId, setExpandedBotId] = useState<string | null>(
    bots[0]?.botId ?? null,
  );

  const toggleExpand = (id: string) => {
    setExpandedBotId(expandedBotId === id ? null : id);
  };

  if (bots.length === 0) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-lg p-12 text-center">
        <span className="material-symbols-outlined text-neutral-600 text-[48px] block mb-3">
          bookmark_add
        </span>
        <p className="text-neutral-400 text-sm">No bots in your watchlist yet.</p>
        <p className="text-neutral-600 text-xs mt-1">
          Add bots from the leaderboard to track them here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-neutral-500 uppercase bg-[#1A1A1A] border-b border-white/10">
            <tr>
              <th className="px-6 py-3 font-medium w-[240px]">Bot</th>
              <th className="px-6 py-3 font-medium">Strategy</th>
              <th className="px-6 py-3 font-medium text-right">7D %</th>
              <th className="px-6 py-3 font-bold text-white text-right">30D %</th>
              <th className="px-6 py-3 font-medium text-right">30D PnL</th>
              <th className="px-6 py-3 font-medium text-right">Drawdown</th>
              <th className="px-6 py-3 font-medium text-right">Last Active</th>
              <th className="px-6 py-3 font-medium text-center w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bots.map((bot) => {
              const isExpanded = expandedBotId === bot.botId;
              return (
                <>
                  <tr
                    key={bot.botId}
                    className={`transition-colors cursor-pointer ${
                      isExpanded
                        ? "bg-[#1A1A1A] border-l-2 border-l-[#ff6a00]"
                        : "group hover:bg-white/[0.02]"
                    }`}
                    onClick={() => toggleExpand(bot.botId)}
                  >
                    <td className={`px-6 ${isExpanded ? "py-4" : "py-3"}`}>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded bg-gradient-to-tr from-[#ff6a00] to-amber-700 flex items-center justify-center text-xs font-bold text-white`}
                        >
                          {bot.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-white">{bot.name}</span>
                          <span className="text-xs text-neutral-500 font-mono">
                            {bot.address.slice(0, 6)}...{bot.address.slice(-4)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 ${isExpanded ? "py-4" : "py-3"}`}>
                      <span className="inline-flex items-center px-2 py-1 rounded bg-[#ff6a00]/10 text-[#ff6a00] text-xs border border-[#ff6a00]/20">
                        {bot.strategy}
                      </span>
                    </td>
                    <td
                      className={`px-6 ${isExpanded ? "py-4" : "py-3"} text-right tabular-nums font-medium ${
                        bot.return7d >= 0 ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {formatPct(bot.return7d)}
                    </td>
                    <td
                      className={`px-6 ${isExpanded ? "py-4" : "py-3"} text-right tabular-nums font-bold text-base ${
                        bot.return30d >= 0 ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {formatPct(bot.return30d)}
                    </td>
                    <td
                      className={`px-6 ${isExpanded ? "py-4" : "py-3"} text-right tabular-nums ${
                        bot.pnl30dUsd >= 0 ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {formatUsd(bot.pnl30dUsd)}
                    </td>
                    <td
                      className={`px-6 ${isExpanded ? "py-4" : "py-3"} text-right tabular-nums text-neutral-300`}
                    >
                      {Math.abs(bot.maxDrawdownPct).toFixed(1)}%
                    </td>
                    <td
                      className={`px-6 ${isExpanded ? "py-4" : "py-3"} text-right tabular-nums text-neutral-400`}
                    >
                      {timeAgo(bot.lastActiveAt)}
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
                            toggleExpand(bot.botId);
                          }}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {isExpanded ? "notifications" : "notifications_active"}
                          </span>
                        </button>
                        <a
                          href={`/${bot.botId}`}
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            open_in_new
                          </span>
                        </a>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Expanded Alert Configuration Row */}
                  {isExpanded && (
                    <tr className="bg-[#1A1A1A] border-l-2 border-l-[#ff6a00]/50">
                      <td className="px-6 py-0" colSpan={8}>
                        <div className="py-4 pl-12 pr-4 border-t border-white/5">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#ff6a00] text-[18px]">
                                  tune
                                </span>
                                Alert Configuration — {bot.name}
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
                              <div className="bg-black/40 border border-white/5 p-3 rounded flex items-start gap-3">
                                <div className="mt-0.5 text-neutral-400">
                                  <span className="material-symbols-outlined text-[20px]">trending_down</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-neutral-200">Drawdown Threshold</span>
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
                                    <span className="text-xs text-neutral-500">%</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-black/40 border border-white/5 p-3 rounded flex items-start gap-3">
                                <div className="mt-0.5 text-neutral-400">
                                  <span className="material-symbols-outlined text-[20px]">payments</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-neutral-200">PnL Milestone</span>
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
                                    <span className="text-xs text-neutral-500">USDC</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-black/40 border border-white/5 p-3 rounded flex items-start gap-3">
                                <div className="mt-0.5 text-neutral-400">
                                  <span className="material-symbols-outlined text-[20px]">mail</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-neutral-200">Email Alerts</span>
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
      <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between bg-[#1A1A1A]">
        <div className="text-xs text-neutral-400">Showing {bots.length} bots</div>
      </div>
    </div>
  );
}
