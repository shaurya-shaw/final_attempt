export const EVENTS = [
  {
    label: "Easy Paper",
    emoji: "🟢",
    effect: 8,
    caption: "Everyone walks out smiling. Rank lists still destroy dreams.",
  },
  {
    label: "Cutoff Increased",
    emoji: "🟡",
    effect: -15,
    caption: "Your marks improved. The finish line moved faster.",
  },
  {
    label: "Centre Changed",
    emoji: "🟠",
    effect: -5,
    caption: "The centre moved. Your responsibilities didn't.",
  },
  {
    label: "Paper Leak",
    emoji: "🔴",
    effect: -25,
    caption: "The paper leaked. Your lost years didn't come back.",
  },
  {
    label: "Exam Postponed",
    emoji: "🔴",
    effect: -12,
    caption: "A new date is coming. Put your life on hold until then.",
  },
  {
    label: "Normal Day",
    emoji: "🟣",
    effect: 5,
    caption: "Nothing went wrong. Suspicious.",
  },
  {
    label: "Technical Error",
    emoji: "🟠",
    effect: -8,
    caption: "Your preparation worked. Their software didn't.",
  },
  {
    label: "Server Crash",
    emoji: "🔴",
    effect: -18,
    caption: "Millions prepared. One server didn't.",
  },
] as const;

export type ExamEvent = (typeof EVENTS)[number];

export const SEGMENT_ANGLE = 360 / EVENTS.length;
