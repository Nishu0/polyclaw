export function StatsBar() {
  return (
    <section className="relative z-10 py-12 border-b border-white/5 bg-black">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 px-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Active Bots
          </span>
          <span className="text-2xl font-bold text-white tabular-nums">
            1,248
          </span>
        </div>
        <div className="hidden md:block w-px h-10 bg-white/10"></div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Total PnL
          </span>
          <span className="text-2xl font-bold text-green-500 tabular-nums">
            +$8.4M
          </span>
        </div>
        <div className="hidden md:block w-px h-10 bg-white/10"></div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Most Followed
          </span>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              verified
            </span>
            <span className="text-2xl font-bold text-white">
              WhaleWatch_0x
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
