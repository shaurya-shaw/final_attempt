"use client";

import { SpentSlider } from "../components/spent-slider/spent-slider";
import { useSpentStore } from "@/lib/spentStore";

export default function SpentPage() {
  const moneySpent = useSpentStore((state) => state.moneySpent);
  const timeSpent = useSpentStore((state) => state.timeSpent);
  const setMoneySpent = useSpentStore((state) => state.setMoneySpent);
  const setTimeSpent = useSpentStore((state) => state.setTimeSpent);

  return (
    <div className="flex w-full max-w-sm flex-col gap-8 rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-semibold text-balance">
          How Much Are You Betting?
        </h2>
        <p className="text-sm text-muted-foreground text-pretty">
          Time. Money. Pieces of your life
        </p>
      </div>
      <SpentSlider
        EMOJIS={[""]}
        name="Time spent"
        min={0}
        max={10}
        step={1}
        value={timeSpent}
        onValueChange={setTimeSpent}
        prefix=""
        suffix=" years"
      />
      <SpentSlider
        EMOJIS={["💸", "💸", "💸", "💸"]}
        name="Money spent"
        min={0}
        max={1000000}
        step={10000}
        value={moneySpent}
        onValueChange={setMoneySpent}
        prefix="₹"
        suffix="+"
      />
    </div>
  );
}
