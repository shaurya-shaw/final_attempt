"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { animate, motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Share2 } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { EVENTS } from "@/app/data/events";
import { RACE_TRACKS } from "@/app/data/raceTracks";
import { useAttemptStore } from "@/app/store/attemptStore";
import { useRaceTrackStore } from "@/app/store/raceTrackStore";
import { useSacrificeStore } from "@/app/store/sacrificeStore";
import { useSpentStore } from "@/app/store/spentStore";
import { useSpinStore } from "@/app/store/spinStore";
import { calculateSurvivalChance } from "@/lib/survivalScoreCalculator";
import {
  createSurvivalShareCard,
  downloadShareCard,
} from "@/lib/survivalShareCard";

const getSurvivalStatus = (chance: number): string => {
  if (chance >= 55) return "AGAINST ALL ODDS";
  if (chance >= 48) return "STILL STANDING";
  if (chance >= 40) return "STILL RUNNING";
  if (chance >= 30) return "BARELY HOLDING ON";
  if (chance >= 20) return "SYSTEM VICTIM";
  if (chance >= 10) return "ONE STEP TOO FAR";
  return "THE SYSTEM WINS";
};

const getVerdictQuote = (chance: number): string => {
  if (chance >= 55) return "The race didn’t end. It just got longer.";
  if (chance >= 35)
    return "If hard work guaranteed success, this report wouldn’t exist.";
  return "The system didn’t test your knowledge. It tested your luck.";
};

function getAttemptScore(selectedAttempt: string | null) {
  switch (selectedAttempt) {
    case "lost_count":
      return 10;
    case "4th":
      return 4;
    case "3rd":
      return 3;
    case "2nd":
      return 2;
    case "1st":
      return 1;
    default:
      return 0;
  }
}

function getAttemptLabel(selectedAttempt: string | null) {
  switch (selectedAttempt) {
    case "1st":
      return "1st Attempt";
    case "2nd":
      return "2nd Attempt";
    case "3rd":
      return "3rd Attempt";
    case "4th":
      return "4th Attempt";
    case "lost_count":
      return "Lost Count";
    default:
      return "Attempt Unknown";
  }
}

function formatMoney(value: number) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${Math.round(value / 1000)}K`;
  return `₹${value}`;
}

function formatTime(hours: number) {
  if (hours >= 1000) return `${(hours / 1000).toFixed(1)}K hrs`;
  return `${Math.round(hours)} hrs`;
}

function CountedChance({ chance }: { chance: number }) {
  const [displayedChance, setDisplayedChance] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const controls = animate(0, chance, {
      duration: prefersReducedMotion ? 0 : 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayedChance(Math.round(latest)),
    });
    return () => controls.stop();
  }, [chance, prefersReducedMotion]);

  return (
    <p className="font-display text-[clamp(5rem,13vw,7.5rem)] leading-none font-bold tracking-[-0.08em] text-rose-500 tabular-nums">
      {displayedChance}
      <span className="text-[0.45em] tracking-normal text-rose-500/50">%</span>
    </p>
  );
}

export default function SurvivalReportPage() {
  const router = useRouter();
  const selectedAttempt = useAttemptStore((s) => s.selectedAttempt);
  const resetSelectedAttempt = useAttemptStore((s) => s.resetSelectedAttempt);
  const raceName = useRaceTrackStore((s) => s.raceName);
  const mascotImageID = useRaceTrackStore((s) => s.mascotImageID);
  const resetRaceName = useRaceTrackStore((s) => s.resetRaceName);
  const resetMascotImageID = useRaceTrackStore((s) => s.resetMascotImageID);
  const sacrificeCount = useSacrificeStore((s) => s.count);
  const resetSacrifices = useSacrificeStore((s) => s.reset);
  const moneySpent = useSpentStore((s) => s.moneySpent);
  const timeSpent = useSpentStore((s) => s.timeSpent);
  const resetMoneySpent = useSpentStore((s) => s.resetMoneySpent);
  const resetTimeSpent = useSpentStore((s) => s.resetTimeSpent);
  const score = useSpinStore((s) => s.score);
  const outcome = useSpinStore((s) => s.outcome);
  const resetScore = useSpinStore((s) => s.resetScore);
  const resetOutcome = useSpinStore((s) => s.resetOutcome);

  const [shareLabel, setShareLabel] = useState("Share Report");
  const [isSharing, setIsSharing] = useState(false);

  const chance = useMemo(
    () =>
      calculateSurvivalChance({
        sacrificeCount,
        spinScore: score,
        moneySpent,
        timeSpent: timeSpent * 365 * 24,
        selectedAttempt: getAttemptScore(selectedAttempt),
        raceName,
      }),
    [moneySpent, raceName, sacrificeCount, score, selectedAttempt, timeSpent],
  );

  const track = useMemo(
    () =>
      RACE_TRACKS.find((r) => r.id === mascotImageID) ??
      RACE_TRACKS.find((r) => r.name === raceName),
    [mascotImageID, raceName],
  );

  const event = useMemo(
    () => EVENTS.find((e) => e.label === outcome),
    [outcome],
  );

  const status = getSurvivalStatus(chance);
  const quote = getVerdictQuote(chance);
  const eventLabel = event?.label ?? outcome ?? "Normal Day";
  const eventEmoji = event?.emoji ?? "◉";
  const eventEffect = event?.effect ?? score;
  const totalHours = timeSpent * 365 * 24;

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      const imageBlob = await createSurvivalShareCard({
        chance,
        examName: raceName ?? track?.name ?? "Exam Route",
        eventLabel,
        eventEffect,
        quote,
        status,
        mascotSrc: track?.mascotSrc,
        attemptLabel: getAttemptLabel(selectedAttempt),
        sacrificeCount,
        moneyLabel: formatMoney(moneySpent),
        timeLabel: formatTime(totalHours),
      });

      const shareFile = new File([imageBlob], "student-survival-report.png", {
        type: "image/png",
      });
      const shareData = {
        files: [shareFile],
        title: "Student Survival Simulator — Survival Report",
      };

      if (navigator.canShare?.(shareData) && navigator.share) {
        await navigator.share(shareData);
        setShareLabel("Report Shared");
      } else {
        downloadShareCard(imageBlob);
        setShareLabel("Image Downloaded");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setShareLabel("Couldn’t Share");
      }
    } finally {
      setIsSharing(false);
      window.setTimeout(() => setShareLabel("Share Report"), 1800);
    }
  };

  const handleRunAgain = () => {
    resetSelectedAttempt();
    resetRaceName();
    resetMascotImageID();
    resetSacrifices();
    resetMoneySpent();
    resetTimeSpent();
    resetScore();
    resetOutcome();
    router.push("/select");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <StarsBackground />
      <ShootingStars />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:py-5">
        {/* ========== LEFT: MASCOT ========== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center lg:w-[42%] lg:justify-end"
        >
          {track ? (
            <motion.div
              className="relative size-[140px] sm:size-[200px] lg:size-[380px] xl:size-[440px]"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={track.mascotSrc}
                alt={`${track.name} mascot`}
                fill
                priority
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 440px"
                className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.7)]"
              />
            </motion.div>
          ) : (
            <div className="flex size-[140px] items-center justify-center text-6xl font-light text-white/20 sm:size-[200px] lg:size-[380px]">
              ?
            </div>
          )}
        </motion.div>

        {/* ========== RIGHT: REPORT ========== */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.08 },
            },
          }}
          className="mt-6 flex flex-1 flex-col lg:mt-0 lg:max-w-md"
        >
          {/* Header */}
          <motion.p
            variants={fadeUp}
            className="text-center text-[11px] font-medium tracking-[0.35em] text-white/40 uppercase lg:text-left"
          >
            Survival Report
          </motion.p>

          {/* Hero Number */}
          <motion.div
            variants={fadeUp}
            className="mt-6 text-center sm:mt-4 lg:mt-8 lg:text-left"
          >
            <CountedChance chance={chance} />
            <p className="mt-3 text-sm tracking-[0.18em] text-white/40 uppercase">
              Survival Chance
            </p>
          </motion.div>

          {/* Status */}
          <motion.h1
            variants={fadeUp}
            className="mt-7 text-center font-display text-[clamp(1.7rem,5.5vw,2.4rem)] leading-[0.95] font-bold tracking-[-0.04em] text-white uppercase lg:text-left"
          >
            {status}
          </motion.h1>

          {/* Context */}
          <motion.div
            variants={fadeUp}
            className="mt-4 flex items-center justify-center gap-3 text-sm text-white/55 lg:justify-start"
          >
            <span>{raceName ?? track?.name ?? "Exam Route"}</span>
            <span className="text-white/25">•</span>
            <span>{getAttemptLabel(selectedAttempt)}</span>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 h-px w-14 bg-white/15 lg:mx-0"
          />

          {/* Stats Grid */}
          <motion.div variants={fadeUp} className="mt-8 grid grid-cols-3 gap-3">
            {[
              { label: "Sacrifices", value: sacrificeCount },
              { label: "Spent", value: formatMoney(moneySpent) },
              { label: "Time", value: formatTime(totalHours) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center"
              >
                <p className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.14em] text-white/40 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Defining Event */}
          <motion.div
            variants={fadeUp}
            className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
          >
            <p className="text-[11px] tracking-[0.18em] text-white/40 uppercase">
              Defining Event
            </p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{eventEmoji}</span>
                <p className="text-[15px] font-medium text-white">
                  {eventLabel}
                </p>
              </div>
              <p
                className={`font-display text-lg font-semibold tabular-nums ${
                  eventEffect > 0
                    ? "text-emerald-400"
                    : eventEffect < 0
                      ? "text-rose-400"
                      : "text-white/70"
                }`}
              >
                {eventEffect > 0 ? "+" : ""}
                {eventEffect}
              </p>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={fadeUp}
            className="mt-7 text-center text-[14px] leading-7 text-white/45 italic lg:text-left"
          >
            “{quote}”
          </motion.blockquote>

          {/* Actions */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10"
          >
            <button
              type="button"
              onClick={handleShare}
              disabled={isSharing}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200 disabled:cursor-wait disabled:opacity-70"
            >
              <Share2 className="size-4" />
              {isSharing ? "Preparing Image..." : shareLabel}
            </button>

            <button
              type="button"
              onClick={handleRunAgain}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-7 py-3.5 text-sm font-medium text-white/70 transition duration-300 hover:border-white/35 hover:text-white"
            >
              <RotateCcw className="size-4" />
              Run Again
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
