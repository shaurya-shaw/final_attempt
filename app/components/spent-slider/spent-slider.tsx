"use client";
import { useCallback } from "react";
import confetti from "canvas-confetti";
import { Slider } from "@/components/ui/slider";

export function SpentSlider({
  EMOJIS,
  name,
  min,
  max,
  step,
  value,
  onValueChange,
  prefix = "",
  suffix = "",
}: {
  EMOJIS: string[];
  name: string;
  min: number;
  max: number;
  step: number;
  value?: number;
  onValueChange?: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  const particleCount = 100;

  const fire = useCallback(
    (amount: number) => {
      const shapes = EMOJIS.map((emoji) =>
        confetti.shapeFromText({ text: emoji, scalar: 2 }),
      );
      confetti({
        shapes,
        scalar: 2,
        particleCount: amount,
        spread: 150,
        startVelocity: 90,
        origin: { x: 0.5, y: 0.7 },
      });
    },
    [EMOJIS],
  );

  const currentValue = value ?? min;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{name}</span>
        <span className="font-medium tabular-nums">
          {prefix}
          {currentValue.toLocaleString("en-IN")}
          {suffix}
        </span>
      </div>
      <Slider
        value={[currentValue]}
        onValueChange={(v) => onValueChange?.(Array.isArray(v) ? v[0] : v)}
        onValueCommitted={() => fire(particleCount)}
        min={min}
        max={max}
        step={step}
        aria-label="Confetti intensity"
      />
    </div>
  );
}
