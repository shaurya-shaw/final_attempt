import { create } from "zustand";

interface spinStore {
  score: number;
  outcome: string | null;
  setScore: (score: number) => void;
  setOutcome: (result: string | null) => void;
  resetScore: () => void;
  resetOutcome: () => void;
}

export const useSpinStore = create<spinStore>((set) => ({
  score: 0,
  outcome: null,
  setScore: (score) => set({ score }),
  setOutcome: (outcome) => set({ outcome }),
  resetScore: () => set({ score: 0 }),
  resetOutcome: () => set({ outcome: null }),
}));
