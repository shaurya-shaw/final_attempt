"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { RaceTrack, RaceTrackId } from "../../data/raceTracks";
import AttributeBar from "./AttributeBar";

type RaceTrackCardProps = {
  track: RaceTrack;
  index: number;
  selectedId: RaceTrackId | null;
  onSelect: (id: RaceTrackId) => void;
  isAnimating: boolean;
};

const ATTRIBUTE_LABELS = [
  { key: "competition" as const, label: "Competition" },
  { key: "investment" as const, label: "Investment" },
  { key: "patience" as const, label: "Patience" },
  { key: "uncertainty" as const, label: "Uncertainty" },
];

export default function RaceTrackCard({
  track,
  index,
  selectedId,
  onSelect,
  isAnimating,
}: RaceTrackCardProps) {
  const [mascotError, setMascotError] = useState(false);
  const isSelected = selectedId === track.id;
  const isDimmed = selectedId !== null && !isSelected;

  return (
    <div
      className="animate-card-float"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      <motion.button
        type="button"
        onClick={() => !isAnimating && onSelect(track.id)}
        disabled={isAnimating}
        aria-label={`Select ${track.name} race track`}
        className="relative flex w-full flex-col overflow-hidden rounded-[22px] text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 disabled:cursor-default"
        style={{
          background:
            "linear-gradient(135deg, rgba(15,20,35,0.75), rgba(8,12,22,0.9))",
          border: `1px solid ${isSelected ? track.accentGlow.replace("0.35", "0.6").replace("0.4", "0.6") : "rgba(37,99,235,0.12)"}`,
          boxShadow: isSelected
            ? `0 0 32px ${track.accentGlow}, inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)`
            : "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)",
          backdropFilter: "blur(24px)",
          perspective: "800px",
          minHeight: "420px",
          transition: "border-color 250ms ease, box-shadow 250ms ease",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: isDimmed ? 0.15 : 1,
          y: 0,
          scale: isSelected ? 1.08 : isDimmed ? 0.95 : 1,
          zIndex: isSelected ? 50 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.08 }}
        whileHover={
          !isAnimating && selectedId === null
            ? {
                y: -8,
                scale: 1.02,
                boxShadow: `0 0 24px ${track.accentGlow}, inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)`,
                transition: { duration: 0.25 },
              }
            : undefined
        }
      >
      {/* Mascot container — upper half */}
      <div
        className="relative flex h-[200px] shrink-0 items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
      >
        {!mascotError ? (
          <Image
            src={track.mascotSrc}
            alt={`${track.name} mascot`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setMascotError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-6 text-center">
            <div
              className="h-24 w-24 rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle, ${track.accentGlow} 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
            <span
              className="text-[10px] tracking-[0.15em] uppercase"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                color: "rgba(148,163,184,0.5)",
              }}
            >
              Mascot coming soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6 pt-2">
        <h3
          className="text-2xl font-bold tracking-tight"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            color: "#e8eaf0",
          }}
        >
          {track.name}
        </h3>

        <div className="flex flex-col gap-3">
          {ATTRIBUTE_LABELS.map(({ key, label }, barIndex) => (
            <AttributeBar
              key={key}
              label={label}
              value={track.attributes[key]}
              delay={index * 0.08 + barIndex * 0.08 + 0.2}
            />
          ))}
        </div>

        <p
          className="mt-auto text-sm italic leading-relaxed"
          style={{ color: "rgba(136,146,164,0.9)" }}
        >
          &ldquo;{track.flavorText}&rdquo;
        </p>
      </div>
      </motion.button>
    </div>
  );
}
