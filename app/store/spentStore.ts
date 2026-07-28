import { create } from "zustand";

export type SpentStore = {
  moneySpent: number;
  setMoneySpent: (spent: number) => void;
  timeSpent: number;
  setTimeSpent: (spent: number) => void;
  resetMoneySpent: () => void;
  resetTimeSpent: () => void;
};

export const useSpentStore = create<SpentStore>((set) => ({
  moneySpent: 0,
  timeSpent: 0,
  setTimeSpent: (spent) => set({ timeSpent: spent }),
  setMoneySpent: (spent) => set({ moneySpent: spent }),
  resetMoneySpent: () => set({ moneySpent: 0 }),
  resetTimeSpent: () => set({ timeSpent: 0 }),
}));
