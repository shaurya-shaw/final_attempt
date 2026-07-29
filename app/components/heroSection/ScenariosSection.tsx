"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const SCENARIOS = [
  { n:"01", icon:"📋", title:"Exam Postponed",    desc:"You've studied for 3 months. The night before, a 2am notification: exam postponed indefinitely. Rebuild. Again.", tag:"CRITICAL",       tagColor:"rgba(220,38,38,0.1)",  tagBorder:"rgba(220,38,38,0.25)",  tagText:"#f87171", glow:"rgba(220,38,38,0.15)" },
  { n:"02", icon:"💥", title:"Paper Leak Crisis", desc:"Leaked papers, viral screenshots, WhatsApp groups on fire. Your hard work now under a shadow of re-exam doubt.",  tag:"HIGH STRESS",    tagColor:"rgba(220,38,38,0.1)",  tagBorder:"rgba(220,38,38,0.25)",  tagText:"#f87171", glow:"rgba(220,38,38,0.12)" },
  { n:"03", icon:"🔴", title:"Server Crash",      desc:"Result day. 10 million students. One government portal. The page never loads. You refresh. Refresh. Refresh.",       tag:"NERVE-WRACKING", tagColor:"rgba(37,99,235,0.1)",  tagBorder:"rgba(37,99,235,0.25)",  tagText:"#60a5fa", glow:"rgba(37,99,235,0.15)" },
  { n:"04", icon:"📅", title:"Perpetual Delay",   desc:"Admit cards. Dates. Cut-offs. Counselling rounds. Every milestone moves like goalposts in fog.",                     tag:"PSYCHOLOGICAL",  tagColor:"rgba(234,179,8,0.1)", tagBorder:"rgba(234,179,8,0.25)", tagText:"#fbbf24", glow:"rgba(234,179,8,0.12)" },
  { n:"05", icon:"📰", title:"New Guidelines",    desc:"Syllabus changes 60 days before the exam. Four new chapters. Zero notice. Welcome to the system.",                   tag:"CRITICAL",       tagColor:"rgba(220,38,38,0.1)",  tagBorder:"rgba(220,38,38,0.25)",  tagText:"#f87171", glow:"rgba(220,38,38,0.12)" },
  { n:"06", icon:"🎯", title:"Re-Exam Notice",    desc:"You scored well. Too well. Normalization pulls you back. A re-exam is announced for your centre.",                   tag:"UNFAIR",         tagColor:"rgba(234,179,8,0.1)", tagBorder:"rgba(234,179,8,0.25)", tagText:"#fbbf24", glow:"rgba(234,179,8,0.12)" },
];

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ScenarioCard({ s, index }: { s: typeof SCENARIOS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative overflow-hidden rounded-lg p-7 cursor-default"
      style={{
        background: "linear-gradient(135deg,rgba(15,20,35,0.8),rgba(8,12,22,0.9))",
        border: "1px solid rgba(37,99,235,0.12)",
      }}>
      {/* Top border glow on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${s.glow.replace("0.15","0.8").replace("0.12","0.8")},transparent)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
        aria-hidden="true" />

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-10 h-10 rounded-br-lg pointer-events-none"
        style={{ background: `radial-gradient(circle at bottom right,${s.glow} 0%,transparent 70%)` }}
        aria-hidden="true" />

      <span className="block mb-4 text-[11px] tracking-[0.2em]"
        style={{ fontFamily:"JetBrains Mono,monospace", color:"rgba(37,99,235,0.5)" }}>{s.n}</span>
      <span className="block text-2xl mb-4" role="img" aria-label={s.title}>{s.icon}</span>
      <h3 className="mb-2.5 font-semibold tracking-tight text-lg"
        style={{ fontFamily:"Space Grotesk,sans-serif", color:"#e8eaf0" }}>{s.title}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color:"#8892a4" }}>{s.desc}</p>
      <span className="inline-block px-2.5 py-0.5 rounded-sm text-[9px] tracking-[0.15em] uppercase"
        style={{ fontFamily:"JetBrains Mono,monospace", background:s.tagColor, border:`1px solid ${s.tagBorder}`, color:s.tagText }}>
        {s.tag}
      </span>
    </motion.div>
  );
}

export default function ScenariosSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="max-w-7xl mx-auto px-6 py-32" aria-labelledby="scenarios-title">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16">
        <span className="block mb-4 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily:"JetBrains Mono,monospace", color:"rgba(37,99,235,0.6)" }}>
          // scenarios.exe
        </span>
        <h2 id="scenarios-title"
          className="font-bold leading-[1.1] tracking-tight"
          style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.02em" }}>
          What You&apos;ll{" "}
          <span style={{ color:"transparent", WebkitTextStroke:"1px rgba(37,99,235,0.5)" }}>Navigate</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SCENARIOS.map((s, i) => (
          <ScenarioCard key={s.n} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}
