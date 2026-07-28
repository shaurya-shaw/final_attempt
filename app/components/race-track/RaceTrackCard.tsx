"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import type { RaceTrack, RaceTrackId } from "@/app/data/raceTracks";
import { STAT_META, STAT_KEYS } from "@/app/data/raceTracks";
import AttributeBar from "@/components/race-track/AttributeBar";
import { useRaceTrackStore } from "@/app/store/raceTrackStore";

type RaceTrackCardProps = {
  track: RaceTrack;
  index: number;
  selectedId: RaceTrackId | null;
  onSelect: (id: RaceTrackId) => void;
  isAnimating: boolean;
};

// ─── Main card component ─────────────────────────────────────────────────────
export default function RaceTrackCard({
  track,
  index,
  selectedId,
  onSelect,
  isAnimating,
}: RaceTrackCardProps) {
  const [mascotError, setMascotError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const setRaceName = useRaceTrackStore((state) => state.setRaceName);
  const setMascotImageID = useRaceTrackStore((state) => state.setMascotImageID);

  const isSelected = selectedId === track.id;
  const isDimmed = selectedId !== null && !isSelected;

  // ── 3-D tilt — ±6° ────────────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 220,
    damping: 32,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 220,
    damping: 32,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || isAnimating || selectedId !== null) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [prefersReduced, isAnimating, selectedId, mouseX, mouseY],
  );
  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }, [mouseX, mouseY]);
  const handleMouseEnter = useCallback(() => {
    if (!isAnimating && selectedId === null) setHovered(true);
  }, [isAnimating, selectedId]);

  // ── Accent values ──────────────────────────────────────────────────────
  const BadgeIcon = track.badgeIcon;
  const accentStrong = track.accentGlow
    .replace("0.35", "0.75")
    .replace("0.4", "0.75");
  const borderGradient = `linear-gradient(160deg, ${track.borderFrom}99 0%, ${track.borderFrom}33 40%, #a855f755 70%, #ec489966 100%)`;

  return (
    // Float wrapper — CSS keyframe, killed by prefers-reduced-motion media query
    <div
      className="animate-card-float"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      {/* ── 2px gradient border shell ────────────────────────────────── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          padding: "2px",
          borderRadius: "24px",
          background: borderGradient,
          perspective: "1000px",
          rotateX: prefersReduced ? 0 : rotateX,
          rotateY: prefersReduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
          // Constrain to target card size — grid column controls final width
          width: "100%",
          maxWidth: "360px",
          margin: "0 auto",
        }}
        animate={{
          opacity: isDimmed ? 0.15 : 1,
          scale: isSelected ? 1.05 : isDimmed ? 0.95 : 1,
          zIndex: isSelected ? 50 : 1,
          boxShadow: isSelected
            ? `0 0 44px ${accentStrong}, 0 0 14px ${track.accentGlow}`
            : `0 4px 20px rgba(0,0,0,0.5)`,
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: isDimmed ? 0.15 : 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
          delay: index * 0.08,
          opacity: { duration: 0.45 },
          scale: { duration: 0.3 },
          boxShadow: { duration: 0.4 },
        }}
        whileHover={
          !isAnimating && selectedId === null && !prefersReduced
            ? {
                y: -4,
                scale: 1.025,
                boxShadow: `0 0 26px ${track.accentGlow}, 0 10px 36px rgba(0,0,0,0.55)`,
                transition: { duration: 0.22 },
              }
            : undefined
        }
      >
        {/* ── Dark card body ────────────────────────────────────────── */}
        <motion.button
          type="button"
          onClick={() => {
            if (!isAnimating) {
              setRaceName(track.name);
              setMascotImageID(track.id);
              onSelect(track.id);
            }
          }}
          disabled={isAnimating}
          aria-label={`Select ${track.name} exam track`}
          className="relative flex w-full flex-col overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-white/25"
          style={{
            borderRadius: "22px",
            background:
              "linear-gradient(160deg, #0f1520 0%, #080c14 55%, #060810 100%)",
            // ~580px total gives ~42% image / 58% content split at 180px image height
            minHeight: "480px",
          }}
        >
          {/* ── IMAGE AREA — 180px ≈ 37–43% of card ─────────────────── */}
          <div
            className="relative shrink-0 overflow-hidden"
            style={{
              height: "195px",
              background: `radial-gradient(ellipse 80% 70% at 50% 90%, ${accentStrong.replace(
                "0.75",
                "0.15",
              )} 0%, transparent 70%), linear-gradient(180deg, #0d1525 0%, #060810 100%)`,
            }}
          >
            {/* Noise */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
                opacity: 0.4,
                zIndex: 1,
              }}
              aria-hidden="true"
            />

            {/* Mascot — subtle 1.03× scale on hover */}
            <AnimatePresence mode="wait">
              <motion.div
                key="mascot"
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: 1,
                  scale: hovered && !prefersReduced ? 1.03 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={track.mascotSrc}
                  alt={`${track.name} mascot`}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 640px) 100vw, (max-width: 1440px) 25vw, 360px"
                  onError={() => setMascotError(true)}
                  priority={index < 4}
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom vignette */}
            <div
              className="absolute bottom-0 inset-x-0 pointer-events-none"
              style={{
                height: "64px",
                background:
                  "linear-gradient(to top, #080c14 0%, rgba(8,12,20,0.6) 55%, transparent 100%)",
                zIndex: 2,
              }}
              aria-hidden="true"
            />

            {/* Badge icon — top-left */}
            <div
              className="absolute top-2.5 left-2.5 flex items-center justify-center"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.58)",
                border: `1px solid ${track.borderFrom}50`,
                backdropFilter: "blur(8px)",
                zIndex: 3,
                boxShadow: `0 0 9px ${track.accentGlow}`,
              }}
              aria-hidden="true"
            >
              <BadgeIcon size={13} style={{ color: track.borderFrom }} />
            </div>

            {/* Top specular stripe */}
            <div
              className="absolute top-0 inset-x-0 pointer-events-none"
              style={{
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${track.borderFrom}75, transparent)`,
                zIndex: 3,
              }}
              aria-hidden="true"
            />
          </div>

          {/* ── CONTENT AREA ─────────────────────────────────────────── */}
          <div
            className="flex flex-1 flex-col"
            style={{ padding: "10px 14px 13px" }}
          >
            {/* Exam title — clamp(19px, 2.4vw, 22px) */}
            <h3
              className="text-center font-black uppercase"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(19px, 2.4vw, 22px)",
                color: "#ffffff",
                textShadow: `0 0 18px ${accentStrong}, 0 0 6px ${track.accentGlow}`,
                letterSpacing: "0.12em",
                lineHeight: 1.1,
                marginBottom: 0,
              }}
            >
              {track.name}
            </h3>

            {/* Stat bars — gap 6px, padding 6px 7px */}
            <div
              className="flex flex-col"
              style={{
                gap: "6px",
                padding: "6px 7px",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.28)",
              }}
            >
              {STAT_KEYS.map((key, barIndex) => {
                const meta = STAT_META[key];
                return (
                  <AttributeBar
                    key={key}
                    label={meta.label}
                    value={track.attributes[key]}
                    icon={meta.icon}
                    filledColor={meta.filledColor}
                    glowColor={
                      hovered && !prefersReduced
                        ? meta.glowColor.replace("0.55", "0.8")
                        : meta.glowColor
                    }
                    delay={index * 0.06 + barIndex * 0.07 + 0.2}
                  />
                );
              })}
            </div>

            {/* Footer flavor pill — padding 5px 11px */}
            <div
              className="flex items-center justify-between"
              style={{
                marginTop: "9px",
                borderRadius: "999px",
                background: "rgba(0,0,0,0.42)",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "5px 11px",
              }}
            >
              <Sparkles
                size={10}
                style={{ color: "rgba(148,163,184,0.4)", flexShrink: 0 }}
                aria-hidden="true"
              />
              <p
                className="text-center flex-1 italic"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "11px",
                  color: "rgba(232,234,240,0.7)",
                  letterSpacing: "0.02em",
                  margin: "0 6px",
                  lineHeight: 1.3,
                }}
              >
                {track.flavorText}
              </p>
              <Sparkles
                size={10}
                style={{ color: "rgba(148,163,184,0.4)", flexShrink: 0 }}
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
