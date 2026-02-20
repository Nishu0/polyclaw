import type { WatchlistAlert } from "@/lib/api";
import { timeAgo } from "@/lib/format";

interface RecentActivityProps {
  alerts: WatchlistAlert[];
}

function alertIcon(type: string) {
  if (type === "TAKE_PROFIT" || type === "pnl_milestone")
    return { icon: "check_circle", color: "bg-emerald-500/20 text-emerald-500" };
  if (type === "DRAWDOWN" || type === "drawdown")
    return { icon: "trending_down", color: "bg-rose-500/20 text-rose-500" };
  return { icon: "info", color: "bg-blue-500/20 text-blue-500" };
}

export function RecentActivity({ alerts }: RecentActivityProps) {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        </div>
        <div className="space-y-2">
          {alerts.length === 0 && (
            <div className="flex items-center justify-center p-8 bg-[#111111] border border-white/10 rounded text-neutral-500 text-sm">
              No alerts yet.
            </div>
          )}
          {alerts.map((alert) => {
            const { icon, color } = alertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`flex items-center gap-4 p-3 bg-[#111111] rounded border border-white/10 hover:bg-white/5 transition-colors cursor-pointer group ${
                  !alert.isRead ? "border-l-2 border-l-[#ff6a00]" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-white truncate group-hover:text-[#ff6a00] transition-colors">
                      {alert.message}
                    </span>
                    <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                      {timeAgo(alert.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate">{alert.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Side Card: Quick Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Alert Stats</h3>
        </div>
        <div className="bg-[#111111] border border-white/10 rounded-lg p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">{alerts.length}</div>
              <div className="text-xs text-neutral-500">Total Alerts</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-[#ff6a00]">
                {alerts.filter((a) => !a.isRead).length}
              </div>
              <div className="text-xs text-neutral-500">Unread</div>
            </div>
            <div className="space-y-1 pt-4 border-t border-white/10">
              <div className="text-2xl font-bold text-white">
                {alerts.filter((a) => a.type === "DRAWDOWN" || a.type === "drawdown").length}
              </div>
              <div className="text-xs text-neutral-500">Drawdown Alerts</div>
            </div>
            <div className="space-y-1 pt-4 border-t border-white/10">
              <div className="text-2xl font-bold text-emerald-500">
                {alerts.filter((a) => a.type === "TAKE_PROFIT" || a.type === "pnl_milestone").length}
              </div>
              <div className="text-xs text-neutral-500">Take Profits Hit</div>
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
