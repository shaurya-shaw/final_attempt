export const EVENTS = [
  {
    label: "Easy Paper",
    emoji: "🟢",
    effect: +8,
  },
  {
    label: "Cutoff Increased",
    emoji: "🟡",
    effect: -15,
  },
  {
    label: "Centre Changed",
    emoji: "🟠",
    effect: -5,
  },
  {
    label: "Paper Leak",
    emoji: "🔴",
    effect: -25,
  },
  {
    label: "Exam Postponed",
    emoji: "🔴",
    effect: -12,
  },
  {
    label: "Normal Day",
    emoji: "🟣",
    effect: +5,
  },
  {
    label: "Technical Error",
    emoji: "🟠",
    effect: -8,
  },
  {
    label: "Server Crash",
    emoji: "🔴",
    effect: -18,
  },
] as const;

export type ExamEvent = (typeof EVENTS)[number];

export const SEGMENT_ANGLE = 360 / EVENTS.length;
