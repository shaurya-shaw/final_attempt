"use client";

import { useRouter } from "next/navigation";

export default function SacrificeButton() {
  const router = useRouter();

  return (
    <button
      className="fixed bottom-4 right-4 z-20 rounded-full bg-rose-600/50 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-rose-950/30 transition-all duration-300 ease-out hover:bg-rose-700 hover:translate-y-[-1px] sm:bottom-6 sm:right-6 sm:px-6 sm:py-3.5"
      onClick={() => router.push("/spin")}
    >
      Next
    </button>
  );
}
