export function FormFlow() {
  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-[#27272a] pb-6">
        <div className="flex items-center gap-2 text-[#FF6B00] text-xs font-mono font-medium uppercase tracking-widest">
          <span className="material-symbols-outlined text-[16px]">
            add_circle
          </span>
          New Listing
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          List Your Bot
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Deploy your trading strategy to the marketplace in 3 steps.
        </p>
      </div>
      {/* Progress Tracker */}
      <div className="relative flex items-center justify-between w-full py-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gray-200 dark:bg-[#27272a] -z-10"></div>
        <div className="flex items-center gap-2 bg-[#f4f4f5] dark:bg-black pr-3">
          <div className="flex items-center justify-center size-6 rounded-full bg-[#FF6B00] text-white text-xs font-bold font-mono">
            1
          </div>
          <span className="text-xs font-bold uppercase text-[#FF6B00] tracking-wide">
            Connect
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[#f4f4f5] dark:bg-black px-3">
          <div className="flex items-center justify-center size-6 rounded-full border border-gray-300 dark:border-gray-600 text-gray-400 text-xs font-bold font-mono">
            2
          </div>
          <span className="text-xs font-medium uppercase text-gray-500 tracking-wide">
            Verify
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[#f4f4f5] dark:bg-black pl-3">
          <div className="flex items-center justify-center size-6 rounded-full border border-gray-300 dark:border-gray-600 text-gray-400 text-xs font-bold font-mono">
            3
          </div>
          <span className="text-xs font-medium uppercase text-gray-500 tracking-wide">
            Details
          </span>
        </div>
      </div>
      {/* Step 1: Connect Wallet */}
      <div className="group relative overflow-hidden rounded-lg border border-[#FF6B00]/50 bg-white dark:bg-[#09090b] p-6 shadow-sm">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <span className="material-symbols-outlined text-[120px] text-[#FF6B00]">
            account_balance_wallet
          </span>
        </div>
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                1. Connect Wallet
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Link the wallet that owns the bot logic or smart contract.
              </p>
            </div>
            <span className="px-2 py-1 rounded bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-mono">
              STEP 1/3
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <button className="flex w-full items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-[4px] transition-all cursor-pointer">
              <span className="material-symbols-outlined">wallet</span>
              Connect Wallet
            </button>
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-gray-200 dark:bg-[#27272a]"></div>
              <span className="text-xs text-gray-500 font-mono uppercase">
                Or enter manually
              </span>
              <div className="h-[1px] flex-1 bg-gray-200 dark:bg-[#27272a]"></div>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase text-gray-500">
                Wallet Address
              </span>
              <input
                className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#27272a] rounded-[4px] p-3 font-mono text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none text-slate-900 dark:text-white placeholder-gray-600"
                placeholder="0x..."
              />
            </label>
          </div>
        </div>
      </div>
      {/* Step 2: Verify Ownership (Visual State: Pending) */}
      <div className="rounded-lg border border-gray-200 dark:border-[#27272a] bg-white/50 dark:bg-[#09090b]/50 p-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Verify Ownership
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Sign a gasless message to prove you control this address.
              </p>
            </div>
            <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-500 text-xs font-mono">
              PENDING
            </span>
          </div>
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-[4px] flex items-start gap-3">
            <span className="material-symbols-outlined text-yellow-500 text-sm mt-0.5">
              warning
            </span>
            <p className="text-xs text-yellow-600 dark:text-yellow-500">
              You must connect your wallet in step 1 before signing.
            </p>
          </div>
          <button
            className="w-fit cursor-not-allowed bg-gray-200 dark:bg-gray-800 text-gray-400 font-bold py-2 px-6 rounded-[4px] text-sm"
            disabled
          >
            Sign Message
          </button>
        </div>
      </div>
      {/* Step 3: Bot Details (Visual State: Pending/Form) */}
      <div className="rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#09090b] p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Bot Details
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Public information displayed on the marketplace.
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-500 text-xs font-mono">
            LOCKED
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase text-gray-500">
              Bot Name
            </span>
            <input
              className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#27272a] rounded-[4px] p-2.5 text-sm outline-none text-slate-900 dark:text-white cursor-not-allowed"
              disabled
              placeholder="e.g. Oracle Alpha V2"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase text-gray-500">
              Strategy URL
            </span>
            <input
              className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#27272a] rounded-[4px] p-2.5 text-sm outline-none text-slate-900 dark:text-white cursor-not-allowed"
              disabled
              placeholder="https://..."
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase text-gray-500">
              Strategy Tags
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full border border-dashed border-gray-400 dark:border-gray-600 text-xs text-gray-500 cursor-not-allowed">
                + Market Making
              </span>
              <span className="px-3 py-1 rounded-full border border-dashed border-gray-400 dark:border-gray-600 text-xs text-gray-500 cursor-not-allowed">
                + Arbitrage
              </span>
              <span className="px-3 py-1 rounded-full border border-dashed border-gray-400 dark:border-gray-600 text-xs text-gray-500 cursor-not-allowed">
                + Directional
              </span>
            </div>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase text-gray-500">
              Description (280 chars)
            </span>
            <textarea
              className="w-full h-24 bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#27272a] rounded-[4px] p-3 text-sm resize-none outline-none text-slate-900 dark:text-white cursor-not-allowed"
              disabled
              placeholder="Describe your bot's edge..."
            ></textarea>
          </label>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-[#27272a]">
          <button
            className="bg-[#FF6B00]/50 text-white font-bold py-2 px-8 rounded-[4px] text-sm cursor-not-allowed"
            disabled
          >
            Submit Listing
          </button>
        </div>
      </div>
    </div>
  );
}
