"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";

// ── Constants ──────────────────────────────────────────────────────────────
const HEADLINES = [
  { text: "EXAM POSTPONED", color: "#f87171" },
  { text: "PAPER LEAK", color: "#fb923c" },
  { text: "RESULT DELAYED", color: "#f87171" },
  { text: "SERVER ERROR", color: "#60a5fa" },
  { text: "RE-EXAM NOTICE", color: "#fb923c" },
  { text: "NEW GUIDELINES", color: "#a78bfa" },
];

// ── Framer Motion variants ─────────────────────────────────────────────────
// Typed as Variants to satisfy Framer Motion v12 strict Easing types
const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.6 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};
const heroItemTransition = { duration: 0.9, ease: "easeOut" as const };

// ── Rain ───────────────────────────────────────────────────────────────────
function RainDrops() {
  const drops = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    height: Math.random() * 60 + 40,
    delay: Math.random() * 4,
    duration: Math.random() * 1.5 + 1,
    opacity: Math.random() * 0.4 + 0.2,
  }));
  return (
    <div className="rain-container" aria-hidden="true">
      {drops.map((d) => (
        <div
          key={d.id}
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            height: `${d.height}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ── Dust ───────────────────────────────────────────────────────────────────
function DustParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 80 + 10,
    top: Math.random() * 70 + 15,
    size: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 80,
    dy: -(Math.random() * 100 + 30),
    delay: Math.random() * 12,
    duration: Math.random() * 10 + 8,
  }));
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[4]"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// ── Window rain streaks ────────────────────────────────────────────────────
function WindowRain() {
  const streaks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 90,
    height: Math.random() * 40 + 20,
    delay: Math.random() * 3,
    duration: Math.random() * 1 + 0.8,
  }));
  return (
    <>
      {streaks.map((s) => (
        <div
          key={s.id}
          className="absolute z-[1] w-px"
          style={{
            left: `${s.left}%`,
            top: 0,
            height: `${s.height}%`,
            background:
              "linear-gradient(to bottom, transparent, rgba(100,150,220,0.3), transparent)",
            animation: `rain-fall ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

// ── Lightning ──────────────────────────────────────────────────────────────
function LightningEffect() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flash = () => {
      if (!overlayRef.current) return;
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.05, ease: "none" })
        .to(overlayRef.current, { opacity: 0, duration: 0.08 })
        .to(overlayRef.current, { opacity: 0.7, duration: 0.04 })
        .to(overlayRef.current, { opacity: 0, duration: 0.3 });
    };

    const schedule = () => {
      const delay = Math.random() * 15 + 10; // 10–25 s
      return gsap.delayedCall(delay, () => {
        flash();
        schedule();
      });
    };

    const initial = gsap.delayedCall(3, flash);
    const recurring = schedule();

    return () => {
      initial.kill();
      recurring.kill();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-50 opacity-0"
      style={{ background: "rgba(200,220,255,0.04)" }}
      aria-hidden="true"
    />
  );
}

// ── Monitor with GSAP headline glitch ─────────────────────────────────────
function Monitor() {
  const [idx, setIdx] = useState(0);
  const monitorRef = useRef<HTMLDivElement>(null);
  const redLayerRef = useRef<HTMLSpanElement>(null);
  const bluLayerRef = useRef<HTMLSpanElement>(null);

  // GSAP monitor flicker timeline
  useEffect(() => {
    if (!monitorRef.current) return;
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: gsap.utils.random(4, 8),
    });
    tl.to(monitorRef.current, { opacity: 0.7, duration: 0.05, ease: "none" })
      .to(monitorRef.current, { opacity: 1, duration: 0.06 })
      .to(monitorRef.current, { opacity: 0.85, duration: 0.04 })
      .to(monitorRef.current, { opacity: 1, duration: 0.08 });
    return () => {
      tl.kill();
    };
  }, []);

  // GSAP RGB-split glitch on every headline change
  useEffect(() => {
    if (!redLayerRef.current || !bluLayerRef.current) return;
    const tl = gsap.timeline();
    tl.to(redLayerRef.current, { x: -4, duration: 0.06, ease: "none" }, 0)
      .to(bluLayerRef.current, { x: 4, duration: 0.06, ease: "none" }, 0)
      .to(
        [redLayerRef.current, bluLayerRef.current],
        { x: 0, duration: 0.12 },
        0.06,
      );
  }, [idx]);

  // Cycle headline index
  useEffect(() => {
    const t = gsap.delayedCall(2.8, function cycle() {
      setIdx((i) => (i + 1) % HEADLINES.length);
      gsap.delayedCall(2.8, cycle);
    });
    return () => {
      t.kill();
    };
  }, []);

  const current = HEADLINES[idx];

  return (
    <div
      ref={monitorRef}
      className="relative w-[320px] h-[200px] rounded-lg p-2.5"
      style={{
        background: "linear-gradient(145deg,#0d1117,#1a1d24)",
        border: "1px solid rgba(40,60,100,0.3)",
        boxShadow:
          "0 0 60px rgba(37,99,235,0.25),0 0 120px rgba(37,99,235,0.1),0 20px 60px rgba(0,0,0,0.8)",
      }}
    >
      {/* Screen */}
      <div
        className="w-full h-full rounded overflow-hidden relative"
        style={{
          background: "#000814",
          border: "1px solid rgba(37,99,235,0.2)",
        }}
      >
        {/* Taskbar */}
        <div
          className="absolute top-0 left-0 right-0 h-4 flex items-center gap-1 px-1.5"
          style={{
            background: "rgba(10,20,40,0.8)",
            borderBottom: "1px solid rgba(37,99,235,0.2)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span
            className="ml-2 text-[6px] tracking-widest"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              color: "rgba(100,140,200,0.4)",
            }}
          >
            BOARD.GOV.IN — LIVE
          </span>
        </div>

        {/* Headline area */}
        <div className="absolute inset-0 flex items-center justify-center mt-2">
          {/* Red RGB layer */}
          <span
            ref={redLayerRef}
            className="absolute text-[11px] font-bold tracking-widest uppercase select-none blur-[0.5px]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              color: "rgba(239,68,68,0.5)",
            }}
          >
            {current.text}
          </span>
          {/* Blue RGB layer */}
          <span
            ref={bluLayerRef}
            className="absolute text-[11px] font-bold tracking-widest uppercase select-none blur-[0.5px]"
            style={{
              fontFamily: "JetBrains Mono,monospace",
              color: "rgba(96,165,250,0.5)",
            }}
          >
            {current.text}
          </span>
          {/* Main headline — AnimatePresence for smooth swap */}
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, filter: "blur(3px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative z-[1] text-[11px] font-bold tracking-widest uppercase text-center"
              style={{
                fontFamily: "JetBrains Mono,monospace",
                color: current.color,
                textShadow: `0 0 12px ${current.color}99,0 0 24px ${current.color}44`,
              }}
            >
              {current.text}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-2 left-3 right-3 flex gap-1">
          {HEADLINES.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[1.5px] rounded transition-colors duration-300"
              style={{
                background:
                  i === idx ? "rgba(96,165,250,0.8)" : "rgba(30,50,90,0.4)",
              }}
            />
          ))}
        </div>

        {/* Screen glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%,rgba(37,99,235,0.15) 0%,transparent 70%)",
          }}
        />
      </div>

      {/* Stand + base */}
      <div
        className="w-[30px] h-5 mx-auto"
        style={{
          background: "linear-gradient(to bottom,#0d1117,#080b10)",
          clipPath: "polygon(20% 0%,80% 0%,100% 100%,0% 100%)",
        }}
      />
      <div
        className="w-[70px] h-1.5 mx-auto rounded-full"
        style={{
          background: "linear-gradient(to right,#0a0d14,#12161e,#0a0d14)",
        }}
      />
    </div>
  );
}

// ── Student silhouette SVG ─────────────────────────────────────────────────
function StudentSilhouette() {
  return (
    <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 z-[8] pointer-events-none">
      <svg
        width="220"
        height="200"
        viewBox="0 0 220 200"
        fill="none"
        aria-hidden="true"
      >
        <rect x="85" y="130" width="8" height="60" rx="2" fill="#0a0d14" />
        <rect x="127" y="130" width="8" height="60" rx="2" fill="#0a0d14" />
        <rect x="80" y="128" width="60" height="10" rx="3" fill="#0d1018" />
        <rect x="80" y="165" width="60" height="10" rx="3" fill="#0d1018" />
        <path
          d="M95 125Q110 115 125 125L130 160Q110 165 90 160Z"
          fill="#080b10"
        />
        <path
          d="M92 127Q80 135 75 155Q90 158 95 150Q105 165 110 165Q115 165 125 150Q130 158 145 155Q140 135 128 127Q110 118 92 127Z"
          fill="#0a0e16"
        />
        <rect x="106" y="100" width="8" height="22" rx="4" fill="#090c14" />
        <ellipse cx="110" cy="95" rx="20" ry="22" fill="#0a0d16" />
        <ellipse cx="110" cy="80" rx="20" ry="12" fill="#060810" />
        <path d="M90 85Q95 70 110 68Q125 70 130 85" fill="#060810" />
        <path
          d="M92 135Q78 148 72 168"
          stroke="#0a0e16"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M128 135Q142 148 148 168"
          stroke="#0a0e16"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx="110"
          cy="80"
          rx="22"
          ry="14"
          fill="none"
          stroke="rgba(37,99,235,0.08)"
          strokeWidth="8"
          filter="url(#hg)"
        />
        <defs>
          <filter id="hg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// ── Room props (books, mug, keyboard, phone, notebook, backpack) ───────────
function RoomProps() {
  return (
    <>
      {/* Desk surface */}
      <div
        className="absolute bottom-[28%] left-1/2 -translate-x-1/2 z-[9] rounded-sm"
        style={{
          width: 700,
          height: 18,
          background:
            "linear-gradient(180deg,#1a1f2e 0%,#0d1018 50%,#080b12 100%)",
          borderTop: "1px solid rgba(40,60,100,0.25)",
          boxShadow: "0 -2px 20px rgba(37,99,235,0.06)",
        }}
      />

      {/* Keyboard */}
      <div
        className="absolute bottom-[29%] left-[calc(50%-80px)] z-[9] w-40 h-11 rounded"
        style={{
          background: "linear-gradient(145deg,#0f1218,#0a0d14)",
          border: "1px solid rgba(40,60,100,0.2)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="absolute inset-[5px] rounded-sm"
          style={{
            background:
              "repeating-linear-gradient(90deg,transparent 0,transparent 6px,rgba(255,255,255,0.03) 6px,rgba(255,255,255,0.03) 7px)",
          }}
        />
      </div>

      {/* Phone */}
      <div
        className="absolute z-[9]"
        style={{
          bottom: "29.5%",
          left: "calc(50% + 60px)",
          width: 26,
          height: 46,
          background: "linear-gradient(145deg,#0f1218,#0a0d14)",
          border: "1px solid rgba(40,60,100,0.25)",
          borderRadius: 4,
          animation: "phone-nudge 8s ease-in-out infinite",
        }}
      >
        <div
          className="absolute top-1 left-0.5 right-0.5 bottom-1 rounded-sm"
          style={{ background: "rgba(15,30,60,0.6)" }}
        >
          {[20, 40, 60].map((t, i) => (
            <div
              key={i}
              className="absolute h-0.5 rounded"
              style={{
                top: `${t}%`,
                left: "10%",
                right: "10%",
                background: "rgba(37,99,235,0.2)",
              }}
            />
          ))}
        </div>
        {/* Notification dot */}
        <div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600"
          style={{
            animation: "notification-pulse 1.5s ease-in-out infinite",
            boxShadow: "0 0 6px rgba(220,38,38,0.6)",
          }}
        />
      </div>

      {/* Coffee mug */}
      <div
        className="absolute z-[9]"
        style={{
          bottom: "30.5%",
          left: "calc(50% + 110px)",
          width: 24,
          height: 28,
          background: "linear-gradient(135deg,#1a1d24,#0d1018)",
          border: "1px solid rgba(60,80,120,0.3)",
          borderRadius: "3px 3px 5px 5px",
        }}
      >
        {/* Handle */}
        <div
          className="absolute"
          style={{
            right: -8,
            top: 6,
            width: 8,
            height: 10,
            border: "1.5px solid rgba(60,80,120,0.3)",
            borderLeft: "none",
            borderRadius: "0 4px 4px 0",
          }}
        />
        {/* Steam wisps */}
        <div
          className="absolute -top-3 left-1 w-0.5 h-2.5 rounded"
          style={{
            background:
              "linear-gradient(to top,rgba(150,180,220,0.2),transparent)",
            animation: "float-y 2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -top-3.5 left-2.5 w-px h-3 rounded"
          style={{
            background:
              "linear-gradient(to top,rgba(150,180,220,0.15),transparent)",
            animation: "float-y 2.5s ease-in-out infinite .5s",
          }}
        />
      </div>

      {/* Books stack */}
      <div
        className="absolute z-[9] flex flex-col"
        style={{ bottom: "30%", left: "calc(50% + 160px)" }}
      >
        {[
          { w: 55, bg: "#0f1520", bc: "rgba(37,99,235,0.2)" },
          { w: 48, bg: "#12180e", bc: "rgba(100,120,50,0.2)" },
          { w: 60, bg: "#150f12", bc: "rgba(120,50,60,0.2)" },
          { w: 52, bg: "#0d1218", bc: "rgba(37,99,235,0.15)" },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              width: b.w,
              height: 14,
              background: b.bg,
              borderBottom: `1px solid ${b.bc}`,
              borderLeft: "2px solid rgba(255,255,255,0.04)",
            }}
          />
        ))}
      </div>

      {/* Notebook */}
      <div
        className="absolute z-[9] overflow-hidden"
        style={{
          bottom: "29.5%",
          left: "calc(50% - 180px)",
          width: 80,
          height: 60,
          background: "linear-gradient(135deg,#12151c,#0a0d14)",
          border: "1px solid rgba(60,80,120,0.2)",
          borderRadius: 2,
          transform: "rotate(-5deg)",
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ background: "rgba(37,99,235,0.15)" }}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute h-px rounded"
            style={{
              top: 12 + i * 10,
              left: 14,
              right: 6,
              background: "rgba(37,99,235,0.1)",
            }}
          />
        ))}
      </div>

      {/* Backpack */}
      <div
        className="absolute z-[7]"
        style={{
          bottom: 0,
          left: "calc(50% + 200px)",
          width: 55,
          height: 75,
          background: "linear-gradient(145deg,#0f1218,#080b10)",
          border: "1px solid rgba(30,50,80,0.3)",
          borderRadius: "6px 6px 8px 8px",
        }}
      >
        <div
          className="absolute bottom-2 left-1.5 right-1.5 h-5"
          style={{ border: "1px solid rgba(30,50,80,0.4)", borderRadius: 3 }}
        />
      </div>

      {/* Sticky notes */}
      <div
        className="absolute z-10 p-1.5"
        aria-hidden="true"
        style={{
          top: "35%",
          left: "calc(50% + 220px)",
          width: 52,
          background: "rgba(45,38,8,0.5)",
          borderTop: "2px solid rgba(200,180,80,0.3)",
          fontFamily: "JetBrains Mono,monospace",
          fontSize: 7,
          lineHeight: 1.5,
          color: "rgba(200,180,100,0.7)",
          transform: "rotate(3deg)",
          animation: "sticky-sway 4s ease-in-out infinite",
        }}
      >
        <div>STUDY PLAN:</div>
        <div
          style={{
            color: "rgba(200,80,80,0.7)",
            textDecoration: "line-through",
          }}
        >
          8am wake
        </div>
        <div
          style={{
            color: "rgba(200,80,80,0.7)",
            textDecoration: "line-through",
          }}
        >
          chapters
        </div>
        <div style={{ color: "rgba(200,180,100,0.5)" }}>cry???</div>
      </div>
      <div
        className="absolute z-10 p-1.5"
        aria-hidden="true"
        style={{
          top: "42%",
          left: "calc(50% + 240px)",
          width: 52,
          background: "rgba(45,38,8,0.5)",
          borderTop: "2px solid rgba(200,180,80,0.3)",
          fontFamily: "JetBrains Mono,monospace",
          fontSize: 7,
          lineHeight: 1.5,
          color: "rgba(200,180,100,0.7)",
          transform: "rotate(-2deg)",
          animation: "sticky-sway 5s ease-in-out infinite 1s",
        }}
      >
        <div>EXAM:</div>
        <div style={{ color: "rgba(200,80,80,0.7)" }}>DELAYED</div>
        <div style={{ fontSize: 6, marginTop: 4 }}>again...</div>
      </div>

      {/* Torn calendar */}
      <div className="absolute z-[5]" style={{ top: "22%", left: "8%" }}>
        {[
          { num: "31", color: "rgba(200,100,100,0.5)", size: 16 },
          { text: "POSTPONED", color: "rgba(80,100,140,0.4)", size: 8 },
          { text: "???", color: "rgba(60,80,120,0.3)", size: 6 },
        ].map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-sm p-1 mb-[-20px]"
            style={{
              width: 60,
              height: 45,
              background: "rgba(15,18,25,0.8)",
              border: "1px solid rgba(40,60,100,0.2)",
              transform:
                i === 1
                  ? "rotate(-8deg) translateY(5px)"
                  : i === 2
                    ? "rotate(5deg) translateY(8px)"
                    : "none",
              opacity: i === 0 ? 1 : i === 1 ? 0.6 : 0.4,
              fontFamily: "JetBrains Mono,monospace",
              fontSize: c.size || 7,
              color: c.color,
              fontWeight: i === 0 ? 700 : 400,
            }}
          >
            {(c as any).num || (c as any).text}
          </div>
        ))}
      </div>

      {/* Window */}
      <div
        className="absolute hidden md:block overflow-hidden"
        style={{
          top: "8%",
          right: "8%",
          width: 180,
          height: 220,
          border: "2px solid rgba(100,130,180,0.15)",
          background: "rgba(5,15,30,0.6)",
          borderRadius: 2,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,#020810 0%,#050f1e 50%,#030812 100%)",
          }}
        />
        <WindowRain />
        {/* Cross bars */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px"
            style={{ background: "rgba(100,130,180,0.15)" }}
          />
          <div
            className="absolute top-[45%] left-0 right-0 h-px"
            style={{ background: "rgba(100,130,180,0.15)" }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg,rgba(255,255,255,0.02) 0%,transparent 50%)",
          }}
        />
        {/* City lights */}
        {[10, 25, 40, 55, 70, 85].map((x, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              bottom: `${10 + (i % 3) * 5}%`,
              left: `${x}%`,
              background: "rgba(180,200,255,0.4)",
              boxShadow: "0 0 4px rgba(180,200,255,0.4)",
            }}
          />
        ))}
      </div>
    </>
  );
}

// ── Magnetic CTA Button ────────────────────────────────────────────────────
function CTAButton({ large = false }: { large?: boolean }) {
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
      id={large ? "final-start-btn" : "start-test-btn"}
      style={{
        x: sx,
        y: sy,
        padding: large ? "20px 56px" : "18px 48px",
        background:
          "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(30,64,175,0.1))",
        border: "1px solid rgba(37,99,235,0.4)",
        color: "#fff",
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: large ? 15 : 14,
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        boxShadow: "0 0 20px rgba(37,99,235,0.3),0 0 40px rgba(37,99,235,0.1)",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onHoverStart={onHoverStart}
      onClick={() => router.push("/select")}
      whileTap={{ scale: 0.97 }}
      aria-label="Start the Student Survival Simulator"
      className="relative inline-flex items-center gap-3 overflow-hidden rounded cursor-pointer mt-5 sm:mt-0"
    >
      {/* Shimmer */}
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

// ── MAIN HERO SCENE ────────────────────────────────────────────────────────
export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      role="main"
      aria-label="Student Survival Simulator Hero"
    >
      {/* ── Room background ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ scale: [1, 1.008, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 55%,rgba(37,99,235,0.12) 0%,transparent 70%),linear-gradient(180deg,#020304 0%,#040608 30%,#060a12 60%,#030508 100%)",
          }}
        />

        {/* Wall texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,transparent 0,transparent 60px,rgba(255,255,255,0.008) 60px,rgba(255,255,255,0.008) 61px),repeating-linear-gradient(180deg,transparent 0,transparent 80px,rgba(255,255,255,0.005) 80px,rgba(255,255,255,0.005) 81px)",
          }}
        />

        {/* Room props (inside breathing wrapper so they breathe too) */}
        <RoomProps />
      </motion.div>

      {/* ── Monitor light cone ── */}
      <div
        className="absolute z-[6] pointer-events-none"
        style={{
          bottom: "46%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "200px solid transparent",
          borderRight: "200px solid transparent",
          borderTop: "300px solid rgba(37,99,235,0.04)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* ── Monitor ── */}
      <div
        className="absolute z-10"
        style={{ bottom: "38%", left: "50%", transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <Monitor />
      </div>

      {/* ── Student silhouette ── */}
      <StudentSilhouette />

      {/* ── Rain ── */}
      <RainDrops />

      {/* ── Dust ── */}
      <DustParticles />

      {/* ── Lightning ── */}
      <LightningEffect />

      {/* ── Ambient blue glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%,rgba(37,99,235,0.07) 0%,transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Floor shadow ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top,rgba(10,22,40,0.8) 0%,transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── CRT ── */}
      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-scanline" aria-hidden="true" />

      {/* ── Hero text ── */}
      <motion.div
        className="relative z-20 text-center max-w-3xl px-6"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.span
          variants={heroItem}
          className="block mb-6 text-[11px] tracking-[0.3em] uppercase"
          style={{
            fontFamily: "JetBrains Mono,monospace",
            color: "rgba(37,99,235,0.8)",
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-red-600 mr-3 align-middle"
            style={{
              animation: "notification-pulse 2s ease-in-out infinite",
              boxShadow: "0 0 8px rgba(220,38,38,0.6)",
            }}
            aria-hidden="true"
          />
          Interactive Simulation · 2026
        </motion.span>

        {/* H1 */}
        <motion.h1
          variants={heroItem}
          className="mb-5 font-bold leading-[1.05] tracking-tight"
          style={{
            fontFamily: "Space Grotesk,sans-serif",
            fontSize: "clamp(32px,5.5vw,72px)",
            letterSpacing: "-0.03em",
          }}
        >
          Can You Survive as a
          <span
            className="block"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(37,99,235,0.6)",
            }}
          >
            Student in India?
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroItem}
          className="text-base mb-12 font-light leading-relaxed"
          style={{ color: "#8892a4", letterSpacing: "0.05em" }}
        >
          A <span style={{ color: "rgba(37,99,235,0.8)" }}>3-minute</span>{" "}
          interactive simulation.
          <br />
          Exam delays. Server crashes. Uncertain futures.
        </motion.p>

        {/* CTA */}
        <motion.div variants={heroItem} className="inline-block">
          <CTAButton />
        </motion.div>

        {/* Meta row */}
        <motion.div
          variants={heroItem}
          className="flex items-center justify-center flex-wrap gap-4 mt-10"
        >
          {["3 Minutes", "Free", "No Signup", "All Devices"].map(
            (m, i, arr) => (
              <span key={m} className="flex items-center gap-2">
                <span
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "JetBrains Mono,monospace",
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#4a5568",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full bg-blue-600 opacity-50"
                    aria-hidden="true"
                  />
                  {m}
                </span>
                {i < arr.length - 1 && (
                  <span
                    className="w-px h-4 bg-blue-900/30"
                    aria-hidden="true"
                  />
                )}
              </span>
            ),
          )}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        aria-label="Scroll to explore"
      >
        <motion.div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(to bottom,transparent,rgba(37,99,235,0.4),transparent)",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-slate-600"
          style={{ fontFamily: "JetBrains Mono,monospace" }}
        >
          Explore
        </span>
      </motion.div>
    </section>
  );
}
