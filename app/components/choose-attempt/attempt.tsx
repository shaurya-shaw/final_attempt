"use client";

import { Caveat } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAttemptStore } from "@/lib/store";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

export default function DraggableCardDemo() {
  const router = useRouter();
  const setSelectedAttempt = useAttemptStore(
    (state) => state.setSelectedAttempt,
  );

  const items = [
    {
      id: "lost_count",
      text: "LOST COUNT 💀",
      className:
        "absolute top-12 left-[10%] md:top-10 md:left-[35%] rotate-[-5deg]",
    },
    {
      id: "4th",
      text: "4th attempt 😨",
      className:
        "absolute top-32 left-[5%] md:top-40 md:left-[25%] rotate-[-7deg]",
    },
    {
      id: "3rd",
      text: "3rd attempt 😭",
      className:
        "absolute top-52 left-[15%] md:top-40 md:left-[35%] rotate-[-7deg]",
    },
    {
      id: "2nd",
      text: "2nd attempt 😒",
      className:
        "absolute top-72 left-[8%] md:top-5 md:left-[40%] rotate-[8deg]",
    },
    {
      id: "1st",
      text: "1st attempt 😛",
      className:
        "absolute top-96 left-[20%] md:top-32 md:left-[45%] rotate-[10deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip bg-[#06080c] p-6 select-none">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800 pointer-events-none">
        JUST PICK IT BRUH.
      </p>
      {items.map((item) => (
        <DraggableCardBody key={item.text} className={item.className}>
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <h3
              className={`${caveat.className} text-center text-3xl md:text-4xl font-bold tracking-wide text-[#1e3a8a] drop-shadow-sm`}
            >
              {item.text}
            </h3>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAttempt(item.id);
                router.push("/spent");
              }}
              onPointerDownCapture={(e) => e.stopPropagation()}
              className="text-red-500 font-bold uppercase tracking-widest text-sm md:text-base cursor-pointer hover:text-red-400 hover:underline transition-all mt-5"
            >
              Select
            </span>
          </div>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
