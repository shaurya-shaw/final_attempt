import { create } from "zustand";

interface RaceTrackStore {
  raceName: string | null;
  mascotImageID: string | null;
  setRaceName: (name: string) => void;
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
