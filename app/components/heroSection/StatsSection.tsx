"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { number: "2.4M+", label: "Students Affected Annually" },
  { number: "67%",   label: "Report Exam-Related Anxiety" },
  { number: "3 Min", label: "To Understand Their Reality" },
  { number: "∞",     label: "Resilience Required" },
];

function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.12 }}
      className="text-center"
    >
      <motion.span
        className="block font-bold leading-none mb-2"
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "clamp(36px,5vw,64px)",
          letterSpacing: "-0.02em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(37,99,235,0.7)",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0.5, 1, 0.85, 1] } : {}}
        transition={{ duration: 1.2, delay: index * 0.12 + 0.3, ease: "easeOut" }}
      >
        {stat.number}
      </motion.span>
      <span
        className="text-[10px] tracking-[0.2em] uppercase block"
        style={{ fontFamily: "JetBrains Mono, monospace", color: "#4a5568" }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section
      className="py-20 px-6"
      style={{
        borderTop:    "1px solid rgba(37,99,235,0.08)",
        borderBottom: "1px solid rgba(37,99,235,0.08)",
        background:   "linear-gradient(180deg,transparent,rgba(10,22,40,0.15),transparent)",
      }}
      aria-label="Statistics"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {STATS.map((s, i) => (
          <StatItem key={s.label} stat={s} index={i} />
        ))}
      </div>
    </section>
  );
}
