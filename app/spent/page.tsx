"use client";

import { useAttemptStore } from "@/lib/store";

export default function SpentPage() {
  const attempt = useAttemptStore((state) => state.selectedAttempt);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#06080c] p-6 text-white">
      <h1 className="text-4xl font-bold mb-4">Spent Page</h1>
      {attempt ? (
        <p className="text-xl text-neutral-400">
          You clicked on: <span className="font-bold text-[#1e3a8a]">{attempt}</span>
        </p>
      ) : (
        <p className="text-xl text-neutral-400">Loading your choice...</p>
      )}
    </div>
  );
}
