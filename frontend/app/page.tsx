import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { Leaderboard } from "@/components/landing/Leaderboard";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { getLeaderboard } from "@/lib/api";

export default async function Home() {
  const leaderboard = await getLeaderboard(5, 0);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-display">
      <main>
        <Hero />
        <StatsBar stats={leaderboard.stats} />
        <Leaderboard bots={leaderboard.data} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
