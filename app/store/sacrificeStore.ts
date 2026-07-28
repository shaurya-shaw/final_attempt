import { create } from "zustand";

export interface SacrificeStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useSacrificeStore = create<SacrificeStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
