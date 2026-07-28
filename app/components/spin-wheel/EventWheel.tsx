"use client";

import { useState } from "react";
import { EVENTS, SEGMENT_ANGLE, type ExamEvent } from "../../data/events";
import ResultCard from "./ResultCard";
import Wheel from "./Wheel";
import { useSpinStore } from "@/app/store/spinStore";

const SPIN_DURATION_MS = 4500;

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

export default function EventWheel() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<ExamEvent | null>(null);

  const spin = () => {
    if (spinning) return;

    const index = Math.floor(Math.random() * EVENTS.length);
    const event = EVENTS[index];
    const segmentCenter = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const targetAngle = normalizeAngle(360 - segmentCenter);
    const currentAngle = normalizeAngle(rotation);
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const rotationToTarget = normalizeAngle(targetAngle - currentAngle);

    // The target is calculated relative to the wheel's current position. This
    // keeps the selected event directly beneath the fixed top pointer on every spin.
    setRotation(rotation + extraSpins * 360 + rotationToTarget);
    setResult(null);
    setSpinning(true);

    window.setTimeout(() => {
      setResult(event);
      setScore(event.effect || 0);
      setSpinning(false);
    }, SPIN_DURATION_MS);
  };
  const { setScore } = useSpinStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-white">
      {result ? (
        <ResultCard result={result} />
      ) : (
        <>
          <div className="mb-12 text-center">
            <h1 className="mb-1 text-2xl font-medium tracking-tight">
              Exam Event
            </h1>
            <p className="text-sm text-zinc-500">Spin to face your fate</p>
          </div>

          <Wheel rotation={rotation} spinning={spinning} />

          <button
            type="button"
            onClick={spin}
            disabled={spinning}
            className={`mt-12 rounded-full border px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${
              spinning
                ? "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
                : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500"
            }`}
          >
            {spinning ? "Spinning..." : "Spin"}
          </button>
        </>
      )}
    </main>
  );
}
