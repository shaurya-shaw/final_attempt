"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { SpentSlider } from "../components/spent-slider/spent-slider";
import { Button } from "../components/ui/button";
import { useSpentStore } from "@/app/store/spentStore";

export default function SpentPage() {
  const router = useRouter();
  const moneySpent = useSpentStore((state) => state.moneySpent);
  const timeSpent = useSpentStore((state) => state.timeSpent);
  const setMoneySpent = useSpentStore((state) => state.setMoneySpent);
  const setTimeSpent = useSpentStore((state) => state.setTimeSpent);

  const isComplete = useMemo(() => {
    return moneySpent > 0 && timeSpent > 0;
  }, [moneySpent, timeSpent]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#ffffff] px-4 py-12 font-sans selection:bg-zinc-800">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_100%)]" />
      <div className="relative z-10 flex w-full max-w-xl flex-col gap-10 rounded-[2rem] border border-black/40 bg-black/20 p-8 shadow-2xl backdrop-blur-3xl sm:p-12 md:gap-14">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            The Stakes
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
            How Much Are You Betting?
          </h2>
          <p className="text-sm font-light tracking-wide text-gray-700 sm:text-base">
            Time. Money. Pieces of your life.
          </p>
        </div>

        <div className="flex flex-col gap-12 mt-2">
          <SpentSlider
            EMOJIS={[""]}
            name="Time Spent"
            min={0}
            max={10}
            step={1}
            value={timeSpent}
            onValueChange={setTimeSpent}
            prefix=""
            suffix=" Years"
          />
          <SpentSlider
            EMOJIS={["💸", "💸", "💸", "💸", "💸", "💸"]}
            name="Money Spent"
            min={0}
            max={1000000}
            step={10000}
            value={moneySpent}
            onValueChange={setMoneySpent}
            prefix="₹"
            suffix="+"
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/sacrifice")}
            className={`rounded-full bg-black/30 px-6 py-3 text-sm font-medium text-black transition-all duration-300 ease-out ${
              isComplete
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
