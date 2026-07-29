import type { Metadata } from "next";
import Navbar from "@/app/components/heroSection/Navbar";
import HeroScene from "@/app/components/heroSection/HeroScene";
import ScenariosSection from "@/app/components/heroSection/ScenariosSection";
import StatsSection from "@/app/components/heroSection/StatsSection";
import FinalCTA from "@/app/components/heroSection/FinalCTA";

export const metadata: Metadata = {
  title: "Student Survival Simulator — Can You Survive as a Student in India?",
  description:
    "A 3-minute interactive simulation. Exam delays, server crashes, paper leaks. Can you survive the Indian student experience?",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <HeroScene />

        {/* Scenarios grid */}
        <div id="scenarios">
          <ScenariosSection />
        </div>

        {/* Stats */}
        <StatsSection />

        {/* Final CTA */}
        <div id="start">
          <FinalCTA />
        </div>

        {/* Footer */}
        <footer
          className="w-full border-t border-blue-900/20 px-6 text-center flex flex-col items-center justify-center gap-3 bg-[#020304]"
          role="contentinfo"
        >
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-slate-400 font-mono max-w-2xl leading-relaxed"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Student Survival Simulator &nbsp;·&nbsp; A fictional interactive
            experience &nbsp;·&nbsp; Built with empathy for every student
          </p>
          <p
            className="text-[9px] tracking-[0.1em] uppercase text-blue-900/60 font-mono mt-1"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            © 2026 · Not affiliated with any board or institution
          </p>
        </footer>
      </main>
    </>
  );
}
