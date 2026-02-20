"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const STRATEGY_TAGS = ["Market Making", "Arbitrage", "Directional"] as const;

export function FormFlow() {
  const [walletAddress, setWalletAddress] = useState("");
  const [botName, setBotName] = useState("");
  const [strategyUrl, setStrategyUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
  const canSubmit = isValidAddress && botName.trim().length > 0 && !submitting;

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/bots/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          name: botName.trim(),
          strategyUrl: strategyUrl.trim() || undefined,
          tags: selectedTags,
          description: description.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="rounded-lg border border-green-500/50 bg-green-500/5 p-8 text-center flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-green-500 text-[48px]">
            check_circle
          </span>
          <h2 className="text-2xl font-bold text-white">Bot Registered</h2>
          <p className="text-gray-400 text-sm max-w-md">
            Your bot has been submitted. It will appear on the leaderboard once
            on-chain activity is detected for the wallet.
          </p>
          <code className="text-xs font-mono text-gray-500 bg-black/50 px-3 py-1.5 rounded">
            {walletAddress}
          </code>
        </div>
      </div>
    );
  }

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
          Register Your Bot
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Paste your Polymarket Safe wallet address to register your bot on the
          platform.
        </p>
      </div>

      {/* Wallet Address */}
      <div className="group relative overflow-hidden rounded-lg border border-[#FF6B00]/50 bg-white dark:bg-[#09090b] p-6 shadow-sm">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <span className="material-symbols-outlined text-[120px] text-[#FF6B00]">
            account_balance_wallet
          </span>
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Polymarket Safe Wallet
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Paste the Polymarket Safe address your bot trades from.
            </p>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase text-gray-500">
              Wallet Address
            </span>
            <input
              className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#27272a] rounded-[4px] p-3 font-mono text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none text-slate-900 dark:text-white placeholder-gray-600"
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value.trim())}
            />
          </label>
          {walletAddress && !isValidAddress && (
            <p className="text-xs text-red-500">
              Enter a valid Ethereum address (0x followed by 40 hex characters).
            </p>
          )}
          {isValidAddress && (
            <div className="flex items-center gap-2 text-green-500 text-xs font-mono">
              <span className="material-symbols-outlined text-sm">
                check_circle
              </span>
              Valid address
            </div>
          )}
        </div>
      </div>

      {/* Bot Details */}
      <div className="rounded-lg border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#09090b] p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Bot Details
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Public information displayed on the marketplace.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase text-gray-500">
              Bot Name <span className="text-red-500">*</span>
            </span>
            <input
              className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#27272a] rounded-[4px] p-2.5 text-sm outline-none text-slate-900 dark:text-white focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              placeholder="e.g. Oracle Alpha V2"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase text-gray-500">
              Strategy URL
            </span>
            <input
              className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#27272a] rounded-[4px] p-2.5 text-sm outline-none text-slate-900 dark:text-white focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              placeholder="https://..."
              value={strategyUrl}
              onChange={(e) => setStrategyUrl(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase text-gray-500">
              Strategy Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {STRATEGY_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full border text-xs cursor-pointer transition-colors ${
                    selectedTags.includes(tag)
                      ? "border-[#FF6B00] bg-[#FF6B00]/20 text-[#FF6B00] font-bold"
                      : "border-dashed border-gray-400 dark:border-gray-600 text-gray-500 hover:border-[#FF6B00] hover:text-[#FF6B00]"
                  }`}
                >
                  {selectedTags.includes(tag) ? "" : "+ "}
                  {tag}
                </button>
              ))}
            </div>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase text-gray-500">
              Description (280 chars)
            </span>
            <textarea
              className="w-full h-24 bg-gray-50 dark:bg-black border border-gray-200 dark:border-[#27272a] rounded-[4px] p-3 text-sm resize-none outline-none text-slate-900 dark:text-white focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              placeholder="Describe your bot's edge..."
              maxLength={280}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="text-xs text-gray-500 text-right">
              {description.length}/280
            </span>
          </label>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-[4px] flex items-start gap-3">
            <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">
              error
            </span>
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-[#27272a]">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`font-bold py-2 px-8 rounded-[4px] text-sm transition-colors ${
              canSubmit
                ? "bg-[#FF6B00] hover:bg-orange-600 text-white cursor-pointer"
                : "bg-[#FF6B00]/50 text-white cursor-not-allowed"
            }`}
          >
            {submitting ? "Submitting..." : "Register Bot"}
          </button>
        </div>
      </div>
    </div>
  );
}
