export function RecentActivity() {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          <a
            className="text-sm text-[#ff6a00] hover:text-[#ff6a00]/80 cursor-pointer"
            href="#"
          >
            View All Alerts
          </a>
        </div>
        <div className="space-y-2">
          {/* Alert Item 1 */}
          <div className="flex items-center gap-4 p-3 bg-[#111111] border-l-2 border-l-[#ff6a00] rounded-r border-y border-r border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">
                check_circle
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-white truncate group-hover:text-[#ff6a00] transition-colors">
                  Alpha Centauri hit Take Profit
                </span>
                <span className="text-xs text-neutral-500 whitespace-nowrap">
                  2 min ago
                </span>
              </div>
              <p className="text-xs text-neutral-400 truncate">
                Position closed at $0.85 (+12% gain)
              </p>
            </div>
          </div>
          {/* Alert Item 2 */}
          <div className="flex items-center gap-4 p-3 bg-[#111111] border-l-2 border-l-[#ff6a00] rounded-r border-y border-r border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">
                trending_down
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-white truncate group-hover:text-[#ff6a00] transition-colors">
                  Delta Arbitrage Drawdown Warning
                </span>
                <span className="text-xs text-neutral-500 whitespace-nowrap">
                  15 min ago
                </span>
              </div>
              <p className="text-xs text-neutral-400 truncate">
                Drawdown exceeded 5% threshold on Market ID 4920
              </p>
            </div>
          </div>
          {/* Alert Item 3 */}
          <div className="flex items-center gap-4 p-3 bg-[#111111] rounded border border-white/10 hover:bg-white/5 transition-colors cursor-pointer group opacity-75">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">
                info
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-neutral-200 truncate group-hover:text-[#ff6a00] transition-colors">
                  Daily Summary Report
                </span>
                <span className="text-xs text-neutral-500 whitespace-nowrap">
                  4 hours ago
                </span>
              </div>
              <p className="text-xs text-neutral-500 truncate">
                Your daily trading summary is ready to view.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Side Card: Quick Stats for Alerts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Alert Stats</h3>
        </div>
        <div className="bg-[#111111] border border-white/10 rounded-lg p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-xs text-neutral-500">Alerts This Week</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-[#ff6a00]">12</div>
              <div className="text-xs text-neutral-500">Unread</div>
            </div>
            <div className="space-y-1 pt-4 border-t border-white/10">
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-xs text-neutral-500">Delivery Rate</div>
            </div>
            <div className="space-y-1 pt-4 border-t border-white/10">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-neutral-500">Critical</div>
            </div>
          </div>
          <button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white text-xs font-medium py-2 rounded transition-colors border border-white/10 cursor-pointer">
            Manage Notification Channels
          </button>
        </div>
      </div>
    </div>
  );
}
