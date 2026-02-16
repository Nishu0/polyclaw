
import { Hero } from "@/components/landing/Hero";
import { StatsBar } from "@/components/landing/StatsBar";
import { Leaderboard } from "@/components/landing/Leaderboard";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 font-display">

      <main>
        <Hero />
        <StatsBar />
        <Leaderboard />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}