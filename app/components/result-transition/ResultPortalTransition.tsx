"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { TriangleAlert } from "lucide-react";

type TransitionStage = "error" | "joke" | "generating";

const ERROR_DURATION = 1.3;
const JOKE_DURATION = 2.5;
const REPORT_DURATION = 0.85;

export default function ResultPortalTransition() {
  const router = useRouter();
  const [stage, setStage] = useState<TransitionStage>("error");
  const screenRef = useRef<HTMLElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      if (!progressRef.current) return;

      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

      const flicker = gsap.timeline({ repeat: -1, repeatDelay: 0.9 });
      flicker
        .to(noiseRef.current, { opacity: 0.22, duration: 0.045 })
        .to(noiseRef.current, { opacity: 0.06, duration: 0.08 })
        .to(noiseRef.current, { opacity: 0.16, duration: 0.03 })
        .to(noiseRef.current, { opacity: 0.06, duration: 0.12 });

      gsap
        .timeline({
          onComplete: () => router.replace("/survival_Report"),
        })
        .to({}, { duration: ERROR_DURATION })
        .call(() => setStage("joke"))
        .to({}, { duration: JOKE_DURATION })
        .call(() => setStage("generating"))
        .to(progressRef.current, {
          scaleX: 1,
          duration: REPORT_DURATION,
          ease: "power2.inOut",
        })
        .to(screenRef.current, {
          opacity: 0,
          duration: 0.28,
          ease: "power2.out",
        });
    }, screenRef);

    return () => context.revert();
  }, [router]);

  return (
    <main
      ref={screenRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-center text-zinc-100"
    >
      <div
        ref={noiseRef}
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.035),transparent_62%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-62.5 w-full max-w-xl flex-col items-center justify-center">
        <AnimatePresence>
          {stage === "error" && <ServerError key="error" />}
          {stage === "joke" && <Joke key="joke" />}
        </AnimatePresence>

        <motion.div
          className="absolute flex w-full flex-col items-center"
          initial={false}
          animate={{
            opacity: stage === "generating" ? 1 : 0,
            y: stage === "generating" ? 0 : 10,
          }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          aria-live="polite"
        >
          <p className="font-display text-lg font-medium tracking-[-0.02em] text-zinc-100 sm:text-xl">
            Generating Survival Report...
          </p>
          <div className="mt-7 h-px w-52 overflow-hidden bg-zinc-800 sm:w-64">
            <div ref={progressRef} className="h-full w-full bg-zinc-100" />
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function ServerError() {
  return (
    <motion.section
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      aria-live="assertive"
    >
      <motion.div
        className="mb-8 text-zinc-100"
        animate={{ opacity: [0.8, 1, 0.86, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <TriangleAlert className="size-12 stroke-[1.35] sm:size-14" />
      </motion.div>

      <h1 className="relative font-display text-4xl font-bold tracking-[-0.055em] text-zinc-100 sm:text-6xl">
        <motion.span
          className="pointer-events-none absolute inset-0 -translate-x-px text-red-400/25"
          animate={{ x: [-1, 0, -1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          SERVER CRASHED
        </motion.span>
        <motion.span
          className="pointer-events-none absolute inset-0 translate-x-px text-cyan-300/20"
          animate={{ x: [1, 0, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        >
          SERVER CRASHED
        </motion.span>
        SERVER CRASHED
      </h1>

      <p className="mt-7 max-w-xs text-sm leading-6 text-zinc-500 sm:text-base">
        Unable to fetch your result.
        <br />
        Please try again later.
        <motion.span
          className="ml-1 inline-block text-zinc-300"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          aria-hidden="true"
        >
          _
        </motion.span>
      </p>

      <div className="mt-8 flex gap-1" aria-label="Loading">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="size-1 rounded-full bg-zinc-500"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 0.75, delay: dot * 0.12, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.section>
  );
}

function Joke() {
  return (
    <motion.section
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      aria-live="polite"
    >
      <div className="relative mb-6 h-20 w-20 sm:h-24 sm:w-24">
        <Image
          src="/laughing-cat.png"
          alt="😛"
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className="object-contain"
          priority
        />
      </div>
      <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-4xl">
        Just kidding.
      </p>
      <p className="mt-3 text-sm text-zinc-500 sm:text-base">
        It isn&apos;t your result portal.
      </p>
    </motion.section>
  );
}
