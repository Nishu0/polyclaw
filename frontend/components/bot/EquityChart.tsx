import { formatPct } from "@/lib/format";

interface EquityChartProps {
  equityUsd: number;
  return7d: number;
}

export function EquityChart({ equityUsd, return7d }: EquityChartProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333333] rounded p-5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Equity Curve</h3>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(equityUsd)}
            </span>
            <span
              className={`text-sm font-medium px-1.5 rounded ${
                return7d >= 0 ? "text-[#00ff41] bg-[#00ff41]/10" : "text-[#ff3b30] bg-[#ff3b30]/10"
              }`}
            >
              {formatPct(return7d)} (7D)
            </span>
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full relative group">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.2"></stop>
              <stop offset="100%" stopColor="#ff6a00" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <line stroke="#333" strokeDasharray="2" strokeWidth="0.1" x1="0" x2="100" y1="25" y2="25"></line>
          <line stroke="#333" strokeDasharray="2" strokeWidth="0.1" x1="0" x2="100" y1="50" y2="50"></line>
          <line stroke="#333" strokeDasharray="2" strokeWidth="0.1" x1="0" x2="100" y1="75" y2="75"></line>
          <path
            d="M0 80 C 10 75, 20 78, 30 65 C 40 55, 50 60, 60 45 C 70 40, 80 42, 90 20 L 100 15 L 100 100 L 0 100 Z"
            fill="url(#chartGradient)"
          ></path>
          <path
            d="M0 80 C 10 75, 20 78, 30 65 C 40 55, 50 60, 60 45 C 70 40, 80 42, 90 20 L 100 15"
            fill="none"
            stroke="#ff6a00"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          ></path>
        </svg>
      </div>
    </div>
  );
}
