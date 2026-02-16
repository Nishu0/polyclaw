import { WatchlistHeader } from "@/components/watchlist/WatchlistHeader";
import { WatchlistSummary } from "@/components/watchlist/WatchlistSummary";
import { WatchlistTable } from "@/components/watchlist/WatchlistTable";
import { RecentActivity } from "@/components/watchlist/RecentActivity";

export default function WatchlistPage() {
  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col font-display antialiased overflow-x-hidden selection:bg-[#ff6a00]/30 selection:text-[#ff6a00] pt-24">
      <main className="flex-1 px-6 pb-12 max-w-[1400px] mx-auto w-full">
        <WatchlistHeader />
        <div className="space-y-6">
          <WatchlistSummary />
          <WatchlistTable />
        </div>
        <RecentActivity />
      </main>
    </div>
  );
}
