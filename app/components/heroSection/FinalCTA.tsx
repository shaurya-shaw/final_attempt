"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import gsap from "gsap";

function MagneticButton() {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 18 });
  const sy = useSpring(my, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) * 0.14);
    my.set((e.clientY - r.top - r.height / 2) * 0.14);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const onHoverStart = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      keyframes: { x: [-3, 3, -2, 2, -1, 1, 0] },
      duration: 0.45,
      ease: "none",
    });
  };

  return (
    <motion.button
      ref={btnRef}
      id="final-start-btn"
      style={{
        x: sx,
        y: sy,
      }}
      className="relative inline-flex items-center gap-3 overflow-hidden rounded cursor-pointer px-14 py-5 bg-gradient-to-br from-[rgba(37,99,235,0.15)] to-[rgba(30,64,175,0.1)] border border-[rgba(37,99,235,0.4)] text-white font-['Space_Grotesk',sans-serif] text-[15px] font-semibold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(37,99,235,0.3),0_0_40px_rgba(37,99,235,0.1)]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onHoverStart={onHoverStart}
      onClick={() => router.push("/select")}
      whileTap={{ scale: 0.97 }}
      aria-label="Start the Student Survival Simulator"
    >
      {/* Shimmer sweep */}
      <motion.span
        className="absolute top-0 h-full w-[60%] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
          skewX: "-20deg",
          left: "-100%",
        }}
        whileHover={{
          left: "150%",
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
        aria-hidden="true"
      />
      {/* Play icon */}
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={{ border: "1.5px solid rgba(37,99,235,0.6)" }}
        aria-hidden="true"
      >
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
          <path d="M1 1L7 5L1 9V1Z" fill="rgba(96,165,250,0.9)" />
        </svg>
      </span>
      START THE TEST
    </motion.button>
  );
}

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative py-40 px-6 text-center overflow-hidden"
      aria-labelledby="final-cta-title"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(37,99,235,0.06) 0%,transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top rule */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(37,99,235,0.2),transparent)",
        }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-xl mx-auto"
      >
        {/* Label */}
        <motion.span
          variants={itemVariants}
          className="block mb-6 text-[10px] tracking-[0.3em] uppercase"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "rgba(37,99,235,0.6)",
          }}
        >
          // are.you.ready?
        </motion.span>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          id="final-cta-title"
          className="font-bold leading-[1.1] tracking-tight mb-4"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(28px,4vw,56px)",
            letterSpacing: "-0.03em",
            color: "#e8eaf0",
          }}
        >
          Face the System. <br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(220,38,38,0.5)",
            }}
          >
            Survive.
          </span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          variants={itemVariants}
          className="text-[15px] leading-relaxed mb-12"
          style={{ color: "#8892a4" }}
        >
          No exam prep required. Just your nerves, your resilience, and 3
          minutes of your life.
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants} className="inline-block">
          <MagneticButton />
        </motion.div>

        {/* Trust signals */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mt-8 opacity-50"
        >
          {["No account needed", "Free forever", "3 min read"].map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                color: "#4a5568",
              }}
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="4"
                  cy="4"
                  r="3"
                  stroke="rgba(37,99,235,0.4)"
                  strokeWidth="1"
                />
                <path
                  d="M2 4L3.5 5.5L6 3"
                  stroke="rgba(37,99,235,0.4)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
