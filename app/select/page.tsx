import type { Metadata } from "next";
import RaceTrackSection from "../components/race-track/RaceTrackSection";

export const metadata: Metadata = {
  title: "Choose Your Race Track — Student Survival Simulator",
  description:
    "Select your exam race track. UPSC, JEE, NEET, Railway, SSC, or Banking — every track has the same finish line.",
};

export default function SelectPage() {
  return (
    <main className="min-h-screen bg-[#020304]">
      <RaceTrackSection />
    </main>
  );
}
