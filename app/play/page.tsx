import { Suspense } from "react";
import PlayContent from "./PlayContent";

export default function PlayPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#020304]">
          <p
            className="text-sm tracking-[0.15em] uppercase"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              color: "rgba(148,163,184,0.6)",
            }}
          >
            Loading...
          </p>
        </main>
      }
    >
      <PlayContent />
    </Suspense>
  );
}
