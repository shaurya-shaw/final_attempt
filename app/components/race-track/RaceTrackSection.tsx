"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { RACE_TRACKS, type RaceTrackId } from "../../data/raceTracks";
import RaceTrackCard from "./RaceTrackCard";
import SelectionOverlay from "./SelectionOverlay";

const NAVIGATION_DELAY_MS = 1800;

export default function RaceTrackSection() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, amount: 0.3 });
  const [selectedId, setSelectedId] = useState<RaceTrackId | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleSelect = useCallback((id: RaceTrackId) => {
    if (isAnimating) return;
    const track = RACE_TRACKS.find((t) => t.id === id);
    setSelectedId(id);
    setIsAnimating(true);
    setAnnouncement(track ? `You chose ${track.name}.` : "You chose this race.");
  }, [isAnimating]);

  useEffect(() => {
    if (!selectedId) return;

    const timer = window.setTimeout(() => {
      router.push(`/play?track=${selectedId}`);
    }, NAVIGATION_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [selectedId, router]);

  return (
    <section
      className="relative min-h-screen px-6 py-16 lg:py-24"
      aria-labelledby="race-track-title"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center lg:mb-20"
        >
          <span
            className="mb-4 block text-[10px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              color: "rgba(37,99,235,0.6)",
            }}
          >
            // choose.race
          </span>
          <h1
            id="race-track-title"
            className="mb-4 font-bold leading-[1.1] tracking-tight"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(28px,4vw,56px)",
              letterSpacing: "-0.02em",
              color: "#e8eaf0",
            }}
          >
            Choose Your{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(37,99,235,0.5)",
              }}
            >
              Race Track
            </span>
          </h1>
          <p
            className="mx-auto max-w-lg text-[15px] italic leading-relaxed"
            style={{ color: "#8892a4" }}
          >
            Every track has the same finish line. Only the journey changes.
          </p>
        </motion.div>

        {/* Screen reader announcement */}
        <div className="sr-only" aria-live="assertive" aria-atomic="true">
          {announcement}
        </div>

        {/* Card grid */}
        <div
          className={`grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 ${isAnimating ? "pointer-events-none" : ""}`}
        >
          {RACE_TRACKS.map((track, index) => (
            <RaceTrackCard
              key={track.id}
              track={track}
              index={index}
              selectedId={selectedId}
              onSelect={handleSelect}
              isAnimating={isAnimating}
            />
          ))}
        </div>

        <SelectionOverlay visible={selectedId !== null} />
      </div>
    </section>
  );
}
