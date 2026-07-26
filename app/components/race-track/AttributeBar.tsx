"use client";

import { motion } from "framer-motion";

type AttributeBarProps = {
  label: string;
  value: number;
  delay?: number;
  animate?: boolean;
};

export default function AttributeBar({
  label,
  value,
  delay = 0,
  animate = true,
}: AttributeBarProps) {
  const fillRatio = Math.min(Math.max(value / 10, 0), 1);

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="text-[10px] tracking-[0.12em] uppercase"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          color: "rgba(148,163,184,0.7)",
        }}
      >
        {label}
      </span>
      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
        role="presentation"
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(37,99,235,0.5), rgba(96,165,250,0.85))",
            transformOrigin: "left center",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: animate ? fillRatio : 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}
