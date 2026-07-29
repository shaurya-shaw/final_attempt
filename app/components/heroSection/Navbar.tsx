"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();

  // Drive background opacity from scroll position (0 → opaque after 30px)
  const bgOpacity  = useTransform(scrollY, [0, 30], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 30], [0, 1]);

  // Also track a boolean for backdrop-filter (can't animate that via motion values)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 20));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 h-14"
      style={{
        backgroundColor: `rgba(2,3,4,${bgOpacity.get()})`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid rgba(37,99,235,${borderOpacity.get() * 0.08})`,
      }}
    >
      {/* Live background values via motion */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `rgba(2,3,4,${bgOpacity})`,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid rgba(37,99,235,0.08)`,
          opacity: bgOpacity,
        }}
        aria-hidden="true"
      />

      {/* Logo */}
      <a
        href="/"
        aria-label="Student Survival Simulator home"
        className="relative z-10 flex items-center gap-2.5 no-underline opacity-90 group"
      >
        <span
          className="w-6 h-6 flex items-center justify-center text-[11px] rounded"
          style={{
            background: "rgba(37,99,235,0.15)",
            border: "1px solid rgba(37,99,235,0.4)",
          }}
          aria-hidden="true"
        >
          ⚡
        </span>
        <span
          className="text-[13px] font-semibold tracking-wide text-slate-200/80"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          SSS
        </span>
        <span
          className="text-[9px] tracking-[0.15em] uppercase pl-1 border-l border-blue-900/40"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(37,99,235,0.6)" }}
        >
          Beta
        </span>
      </a>

      {/* Nav links */}
      <div className="relative z-10 flex items-center gap-8">
        <motion.a
          href="#scenarios"
          className="text-[10px] tracking-[0.2em] uppercase no-underline"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(72,85,105,0.8)" }}
          whileHover={{ color: "rgba(96,165,250,0.9)" }}
          transition={{ duration: 0.2 }}
        >
          Scenarios
        </motion.a>

        <motion.a
          href="#start"
          className="text-[9px] tracking-[0.2em] uppercase no-underline px-4 py-1.5 rounded-sm"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "rgba(96,165,250,0.7)",
            border: "1px solid rgba(37,99,235,0.25)",
          }}
          whileHover={{
            borderColor: "rgba(37,99,235,0.5)",
            backgroundColor: "rgba(37,99,235,0.08)",
            color: "rgba(96,165,250,1)",
          }}
          transition={{ duration: 0.2 }}
        >
          Start →
        </motion.a>
      </div>
    </motion.nav>
  );
}
