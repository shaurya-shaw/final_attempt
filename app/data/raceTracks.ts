import {
  Users,
  IndianRupee,
  RefreshCw,
  Activity,
  Landmark,
  Atom,
  Stethoscope,
  Train,
  Scale,
  Banknote,
  type LucideIcon,
} from "lucide-react";

export type RaceTrackId =
  | "upsc"
  | "jee"
  | "neet"
  | "railway"
  | "ssc"
  | "banking";

export type RaceTrackAttributeKey =
  | "competition"
  | "investment"
  | "patience"
  | "uncertainty";

export type RaceTrackAttributes = Record<RaceTrackAttributeKey, number>;

export type StatMeta = {
  label: string;
  icon: LucideIcon;
  filledColor: string;
  glowColor: string;
};

/** Shared stat metadata — same order/colors/icons on every card */
export const STAT_META: Record<RaceTrackAttributeKey, StatMeta> = {
  competition: {
    label: "Competition",
    icon: Users,
    filledColor: "#2dd4bf",
    glowColor: "rgba(45,212,191,0.55)",
  },
  investment: {
    label: "Investment",
    icon: IndianRupee,
    filledColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.55)",
  },
  patience: {
    label: "Patience",
    icon: RefreshCw,
    filledColor: "#60a5fa",
    glowColor: "rgba(96,165,250,0.55)",
  },
  uncertainty: {
    label: "Uncertainty",
    icon: Activity,
    filledColor: "#f472b6",
    glowColor: "rgba(244,114,182,0.55)",
  },
};

export const STAT_KEYS: RaceTrackAttributeKey[] = [
  "competition",
  "investment",
  "patience",
  "uncertainty",
];

export type RaceTrack = {
  id: RaceTrackId;
  name: string;
  flavorText: string;
  attributes: RaceTrackAttributes;
  mascotSrc: string;
  accentGlow: string;
  /** Border gradient start color (hex/rgb) */
  borderFrom: string;
  /** Lucide icon rendered in the top-left badge */
  badgeIcon: LucideIcon;
};

export const RACE_TRACKS: RaceTrack[] = [
  {
    id: "upsc",
    name: "UPSC",
    flavorText: "Still reading...",
    attributes: {
      competition: 10,
      investment: 10,
      patience: 10,
      uncertainty: 9,
    },
    mascotSrc: "/mascots/upsc.png",
    accentGlow: "rgba(234,179,8,0.35)",
    borderFrom: "#eab308",
    badgeIcon: Landmark,
  },
  {
    id: "jee",
    name: "JEE",
    flavorText: "Sleep is optional.",
    attributes: {
      competition: 9,
      investment: 9,
      patience: 7,
      uncertainty: 6,
    },
    mascotSrc: "/mascots/jee.png",
    accentGlow: "rgba(37,99,235,0.4)",
    borderFrom: "#3b82f6",
    badgeIcon: Atom,
  },
  {
    id: "neet",
    name: "NEET",
    flavorText: "One more attempt?",
    attributes: {
      competition: 9,
      investment: 8,
      patience: 8,
      uncertainty: 7,
    },
    mascotSrc: "/mascots/neet.png",
    accentGlow: "rgba(34,197,94,0.35)",
    borderFrom: "#22c55e",
    badgeIcon: Stethoscope,
  },
  {
    id: "railway",
    name: "Railway",
    flavorText: "Platform changed.",
    attributes: {
      competition: 7,
      investment: 6,
      patience: 9,
      uncertainty: 8,
    },
    mascotSrc: "/mascots/railway.png",
    accentGlow: "rgba(220,38,38,0.35)",
    borderFrom: "#ef4444",
    badgeIcon: Train,
  },
  {
    id: "ssc",
    name: "SSC",
    flavorText: "Waiting continues.",
    attributes: {
      competition: 8,
      investment: 7,
      patience: 10,
      uncertainty: 9,
    },
    mascotSrc: "/mascots/ssc.png",
    accentGlow: "rgba(168,85,247,0.35)",
    borderFrom: "#a855f7",
    badgeIcon: Scale,
  },
  {
    id: "banking",
    name: "Banking",
    flavorText: "Balance: Insufficient.",
    attributes: {
      competition: 7,
      investment: 7,
      patience: 8,
      uncertainty: 7,
    },
    mascotSrc: "/mascots/banking.png",
    accentGlow: "rgba(14,165,233,0.35)",
    borderFrom: "#0ea5e9",
    badgeIcon: Banknote,
  },
];

export const RACE_TRACK_IDS = RACE_TRACKS.map((t) => t.id);

export function isRaceTrackId(
  value: string | null | undefined
): value is RaceTrackId {
  return RACE_TRACK_IDS.includes(value as RaceTrackId);
}

export function getRaceTrack(id: RaceTrackId): RaceTrack | undefined {
  return RACE_TRACKS.find((t) => t.id === id);
}
