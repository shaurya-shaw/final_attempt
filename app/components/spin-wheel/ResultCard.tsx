import { useRouter } from "next/navigation";
import { useSpinStore } from "@/app/store/spinStore";

type ExamEvent = {
  effect: number;
  emoji: string;
  label: string;
};

type ResultCardProps = {
  result: ExamEvent;
};

export default function ResultCard({ result }: ResultCardProps) {
  const effectColor =
    result.effect > 0
      ? "text-emerald-400"
      : result.effect < 0
        ? "text-rose-400"
        : "text-zinc-300";

  const router = useRouter();
  const { score } = useSpinStore();
  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

        <div className="px-8 py-10 text-center">
          <p className="mb-6 text-xs tracking-[0.25em] text-zinc-500">
            EVENT ACTIVATED
          </p>
          <div className="mb-2 text-3xl">{result.emoji}</div>
          <h1 className="mb-8 text-2xl font-semibold tracking-tight">
            {result.label.toUpperCase()}
          </h1>

          <div className="inline-block rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-4">
            <p className="mb-1 text-xs text-zinc-500">Survival Chance</p>
            <p className={`text-3xl font-semibold tabular-nums ${effectColor}`}>
              {result.effect > 0 ? "+" : ""}
              {score}%
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
      </div>

      <button
        type="button"
        onClick={() => router.push("/result-transition")}
        className="mt-8 block w-full rounded-full border border-zinc-700 py-3 text-center text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
      >
        Continue
      </button>
    </div>
  );
}
