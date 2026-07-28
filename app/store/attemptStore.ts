import { create } from "zustand";

interface AttemptStore {
  selectedAttempt: string | null;
  setSelectedAttempt: (attempt: string) => void;
  resetSelectedAttempt: () => void;
}

export const useAttemptStore = create<AttemptStore>((set) => ({
  selectedAttempt: null,
  setSelectedAttempt: (attempt) => set({ selectedAttempt: attempt }),
  resetSelectedAttempt: () => set({ selectedAttempt: null }),
}));
