import { create } from "zustand";

export type raceOption =
  | "NEET"
  | "JEE"
  | "UPSC"
  | "SSC"
  | "Railway"
  | "Banking"
  | null;

interface RaceTrackStore {
  raceName: raceOption;
  mascotImageID: string | null;
  setRaceName: (name: raceOption) => void;
  setMascotImageID: (id: string) => void;
  resetRaceName: () => void;
  resetMascotImageID: () => void;
}

export const useRaceTrackStore = create<RaceTrackStore>((set) => ({
  raceName: null,
  mascotImageID: null,
  setRaceName: (name) => set({ raceName: name }),
  setMascotImageID: (id) => set({ mascotImageID: id }),
  resetRaceName: () => set({ raceName: null }),
  resetMascotImageID: () => set({ mascotImageID: null }),
}));
