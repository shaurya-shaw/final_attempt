import { create } from "zustand";

interface spinStore {
  score: number;
  result: string | null;
  setScore: (score: number) => void;
  setResult: (result: string | null) => void;
}

export const useSpinStore = create<spinStore>((set) => ({
  score: 0,
  result: null,
  setScore: (score) => set({ score }),
  setResult: (result) => set({ result }),
}));
