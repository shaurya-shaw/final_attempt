export type RaceTrackId =
  | "upsc"
  | "jee"
  | "neet"
  | "railway"
  | "ssc"
  | "banking";

export type RaceTrackAttributes = {
  competition: number;
  investment: number;
  patience: number;
  uncertainty: number;
};

export type RaceTrack = {
  id: RaceTrackId;
  name: string;
  flavorText: string;
  attributes: RaceTrackAttributes;
  mascotSrc: string;
  accentGlow: string;
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
  },
];

export const RACE_TRACK_IDS = RACE_TRACKS.map((t) => t.id);

export function isRaceTrackId(value: string | null | undefined): value is RaceTrackId {
  return RACE_TRACK_IDS.includes(value as RaceTrackId);
}

export function getRaceTrack(id: RaceTrackId): RaceTrack | undefined {
  return RACE_TRACKS.find((t) => t.id === id);
}
