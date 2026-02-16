export function CTA() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#f96b06]/5 to-transparent pointer-events-none"></div>
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
          Built for serious <span className="text-gray-400">Polymarket traders.</span>
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Don&apos;t guess. Follow the smart money with real-time tracking and
          verified on-chain performance data.
        </p>
        <button className="bg-primary hover:bg-[#ff7b1a] text-white text-base font-bold h-12 px-10 rounded transition-all shadow-[0_4px_20px_rgba(249,107,6,0.15)] cursor-pointer">
          Get Started
        </button>
      </div>
    </section>
  );
}
