import { create } from "zustand";

interface AttemptStore {
  selectedAttempt: string | null;
  setSelectedAttempt: (attempt: string) => void;
}

export const useAttemptStore = create<AttemptStore>((set) => ({
  selectedAttempt: null,
  setSelectedAttempt: (attempt) => set({ selectedAttempt: attempt }),
}));

interface spinStore {
  score: number;
  setScore: (score: number) => void;
}

export const useSpinStore = create<spinStore>((set) => ({
  score: 0,
  setScore: (score) => set({ score }),
}));
