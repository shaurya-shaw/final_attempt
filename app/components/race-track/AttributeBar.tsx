"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const TOTAL_SEGMENTS = 12;

type AttributeBarProps = {
  label: string;
  value: number; // 0–10
  icon: LucideIcon;
  filledColor: string;
  glowColor: string;
  delay?: number;
};

export default function AttributeBar({
  label,
  value,
  icon: Icon,
  filledColor,
  glowColor,
  delay = 0,
}: AttributeBarProps) {
  const prefersReduced = useReducedMotion();
  // Map 0–10 value to 0–12 filled segments
  const filledCount = Math.round((Math.min(Math.max(value, 0), 10) / 10) * TOTAL_SEGMENTS);

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <div className="flex items-center gap-1.5">
        <Icon
          size={12}
          style={{ color: filledColor, flexShrink: 0 }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            letterSpacing: "0.15em",
            color: "rgba(148,163,184,0.8)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>

      {/* Segment row */}
      <div
        className="flex items-center"
        style={{ gap: "3px" }}
        role="presentation"
        aria-hidden="true"
      >
        {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => {
          const filled = i < filledCount;
          return (
            <motion.div
              key={i}
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "3px",
                flexShrink: 0,
                backgroundColor: filled ? filledColor : "rgba(255,255,255,0.07)",
                boxShadow: filled
                  ? `0 0 6px ${glowColor}, 0 0 2px ${glowColor}`
                  : "none",
              }}
              initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
              animate={
                filled
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1, opacity: 1 }
              }
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      duration: 0.25,
                      ease: "backOut",
                      delay: delay + i * 0.03,
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}
