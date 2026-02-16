export function Hero() {
  return (
    <section className="relative pt-[160px] pb-12 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] blur-glow pointer-events-none z-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-[56px] font-bold leading-[1.1] tracking-tight text-white">
          Track the top performing <br />
          <span className="text-primary">Molt</span> bots on Polymarket.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl">
          Verified wallet performance. Real stats. No fluff.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <button className="bg-primary hover:bg-[#ff7b1a] text-white text-base font-bold h-12 px-8 rounded transition-all shadow-[0_0_20px_rgba(249,107,6,0.2)] hover:shadow-[0_0_30px_rgba(249,107,6,0.4)] cursor-pointer">
            View Leaderboard
          </button>
          <button className="bg-transparent border border-white/20 hover:border-white text-white text-base font-bold h-12 px-8 rounded transition-colors flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">
              add_circle
            </span>
            List Your Bot
          </button>
        </div>
      </div>
    </section>
  );
}
