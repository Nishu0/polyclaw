export function WatchlistHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Watchlist{" "}
          <span className="text-neutral-500 font-normal text-xl ml-1">
            (8)
          </span>
        </h1>
      </div>
      {/* Segmented Control */}
      <div className="flex p-1 bg-[#1A1A1A] border border-white/10 rounded-lg">
        <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-[#ff6a00] text-black rounded shadow-sm transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">
            smart_toy
          </span>
          My Bots
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-all rounded cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">
            notifications
          </span>
          Alerts
        </button>
      </div>
    </div>
  );
}
