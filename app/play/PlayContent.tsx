"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getRaceTrack, isRaceTrackId } from "../data/raceTracks";

export default function PlayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackParam = searchParams.get("track");
  const [mascotError, setMascotError] = useState(false);

  const track = isRaceTrackId(trackParam) ? getRaceTrack(trackParam) : undefined;

  useEffect(() => {
    if (!track) {
      router.replace("/select");
    }
  }, [track, router]);

  if (!track) {
    return (
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
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#020304] px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-md">
        <span
          className="mb-6 block text-[10px] tracking-[0.3em] uppercase"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "rgba(37,99,235,0.6)",
          }}
        >
          // race.selected
        </span>

        <div
          className="relative mx-auto mb-8 h-32 w-32 overflow-hidden rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,20,35,0.8), rgba(8,12,22,0.9))",
            border: `1px solid ${track.accentGlow.replace("0.35", "0.4").replace("0.4", "0.5")}`,
          }}
        >
          {!mascotError ? (
            <Image
              src={track.mascotSrc}
              alt={`${track.name} mascot`}
              fill
              className="object-contain p-3"
              sizes="128px"
              onError={() => setMascotError(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `radial-gradient(circle, ${track.accentGlow} 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
          )}
        </div>

        <h1
          className="mb-3 font-bold tracking-tight"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(28px,4vw,40px)",
            color: "#e8eaf0",
          }}
        >
          {track.name}
        </h1>

        <p
          className="mb-2 text-sm italic"
          style={{ color: "rgba(136,146,164,0.9)" }}
        >
          &ldquo;{track.flavorText}&rdquo;
        </p>

        <p className="mb-10 text-[15px] leading-relaxed" style={{ color: "#8892a4" }}>
          Simulation coming soon. Your race track has been locked in.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/select"
            className="inline-flex items-center rounded border border-[rgba(37,99,235,0.4)] bg-[rgba(37,99,235,0.15)] px-8 py-3 text-[13px] font-semibold tracking-[0.15em] uppercase no-underline transition-opacity hover:opacity-90"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "#e8eaf0",
            }}
          >
            Choose Again
          </Link>
          <Link
            href="/"
            className="inline-flex items-center text-[11px] tracking-[0.15em] uppercase no-underline transition-opacity hover:opacity-80"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              color: "rgba(148,163,184,0.7)",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
