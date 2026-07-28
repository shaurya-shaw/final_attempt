import { EVENTS, SEGMENT_ANGLE } from "../../data/events";

type WheelProps = {
  rotation: number;
  spinning: boolean;
};

export default function Wheel({ rotation, spinning }: WheelProps) {
  return (
    <div className="relative mb-12 size-72 sm:size-80">
      <div
        className="absolute -top-3 left-1/2 z-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="size-0 border-x-[10px] border-x-transparent border-t-[14px] border-t-zinc-300" />
      </div>

      <div
        className="relative size-full overflow-hidden rounded-full border border-zinc-700"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? "transform 4.5s cubic-bezier(0.15, 0.85, 0.2, 1)"
            : "none",
          background: `conic-gradient(
            #18181b 0deg 45deg,
            #27272a 45deg 90deg,
            #18181b 90deg 135deg,
            #27272a 135deg 180deg,
            #18181b 180deg 225deg,
            #27272a 225deg 270deg,
            #18181b 270deg 315deg,
            #27272a 315deg 360deg
          )`,
        }}
      >
        {EVENTS.map((event, index) => {
          const angle = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;

          return (
            <div
              key={event.label}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span
                className="max-w-[68px] text-center text-[10px] leading-tight font-medium text-zinc-400 sm:text-[11px]"
                style={{
                  transform: `translateY(-118px) rotate(-${angle}deg)`,
                }}
              >
                {event.emoji}
                <br />
                {event.label}
              </span>
            </div>
          );
        })}

        <div className="absolute inset-0 z-10 m-auto flex size-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
          <span className="text-[10px] tracking-widest text-zinc-500">
            SPIN
          </span>
        </div>
      </div>
    </div>
  );
}
