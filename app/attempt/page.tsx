import { Caveat } from "next/font/google";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

export default function DraggableCardDemo() {
  const items = [
    {
      text: "LOST COUNT 💀",
      className: "absolute top-10 left-[35%] rotate-[-5deg]",
    },
    {
      text: "4th attempt 😨",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      text: "3rd attempt 😭",
      className: "absolute top-40 left-[35%] rotate-[-7deg]",
    },
    {
      text: "2nd attempt 😒",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      text: "1st attempt 😛",
      className: "absolute top-32 left-[45%] rotate-[10deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip bg-[#06080c] p-6 select-none">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800 pointer-events-none">
        JUST PICK IT BRUH.
      </p>
      {items.map((item) => (
        <DraggableCardBody key={item.text} className={item.className}>
          <h3 className={`${caveat.className} text-center text-4xl font-bold tracking-wide text-[#1e3a8a] drop-shadow-sm`}>
            {item.text}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
