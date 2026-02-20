export function Sidebar() {
  return (
    <div className="lg:col-span-5 relative">
      <div className="sticky top-24 flex flex-col gap-4">
        {/* Stats Widget */}
        <div className="rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#09090b] p-1 shadow-sm">
          <div className="grid grid-cols-2 gap-1 bg-gray-100 dark:bg-black rounded border border-gray-200 dark:border-[#27272a] p-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                Total Bots Listed
              </span>
              <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                312
              </span>
            </div>
            <div className="flex flex-col border-l border-gray-200 dark:border-[#27272a] pl-4">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                New Today
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-mono font-bold text-[#FF6B00] tabular-nums">
                  7
                </span>
                <span className="text-[10px] bg-[#FF6B00]/20 text-[#FF6B00] px-1 rounded font-bold">
                  ▲ 12%
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Why List Card */}
        <div className="rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#09090b] overflow-hidden">
          <div className="bg-gray-50 dark:bg-black/50 px-4 py-3 border-b border-gray-200 dark:border-[#27272a] flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase text-slate-900 dark:text-white">
              Why List Your Bot?
            </h4>
            <span className="material-symbols-outlined text-[#FF6B00] text-sm">
              auto_graph
            </span>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="size-8 rounded flex items-center justify-center bg-blue-500/10 text-blue-500 shrink-0">
                <span className="material-symbols-outlined text-lg">
                  monetization_on
                </span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  Earn Fees
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Monetize your strategy by earning subscription fees from
                  followers.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="size-8 rounded flex items-center justify-center bg-purple-500/10 text-purple-500 shrink-0">
                <span className="material-symbols-outlined text-lg">
                  public
                </span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  Global Visibility
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Showcase your performance on the #1 prediction market
                  leaderboard.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="size-8 rounded flex items-center justify-center bg-green-500/10 text-green-500 shrink-0">
                <span className="material-symbols-outlined text-lg">
                  verified_user
                </span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  Build Reputation
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Verified on-chain track record creates trust for institutional
                  capital.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* How it Works */}
        <div className="rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#09090b] overflow-hidden">
          <div className="bg-gray-50 dark:bg-black/50 px-4 py-3 border-b border-gray-200 dark:border-[#27272a]">
            <h4 className="text-sm font-bold uppercase text-slate-900 dark:text-white">
              How it Works
            </h4>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="font-mono text-xs text-[#FF6B00] mt-0.5">
                  01.
                </span>
                <p className="text-xs text-gray-400">
                  Paste your Polymarket Safe wallet address.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="font-mono text-xs text-[#FF6B00] mt-0.5">
                  02.
                </span>
                <p className="text-xs text-gray-400">
                  Fill in your bot name and strategy details.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="font-mono text-xs text-[#FF6B00] mt-0.5">
                  03.
                </span>
                <p className="text-xs text-gray-400">
                  Submit and go live on the leaderboard.
                </p>
              </li>
            </ul>
          </div>
          {/* Decorative Map/Pattern Area */}
          <div className="h-24 w-full relative border-t border-gray-200 dark:border-[#27272a]">
            {/* Using a solid color as a fallback if the image doesn't load or background-image isn't ideal here */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
              data-alt="Abstract network lines connecting across a dark globe"
              data-location="Global Network"
              style={{
                backgroundImage: "url('https://placeholder.pics/svg/300')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#09090b] to-transparent"></div>
            <div className="absolute bottom-2 left-4">
              <p className="text-[10px] text-gray-500 font-mono">
                POLYMARKET NETWORK STATUS:{" "}
                <span className="text-green-500">ONLINE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
