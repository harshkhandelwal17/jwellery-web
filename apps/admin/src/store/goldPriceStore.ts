import { create } from "zustand";

interface OptimisticRates {
  goldPricePerGram: number;
  silverPricePerGram: number;
  diamondPricePerGram: number;
}

interface GoldPriceStore {
  optimisticRates: OptimisticRates | null;
  setOptimisticRates: (rates: OptimisticRates) => void;
  clearOptimisticRates: () => void;
}

export const useGoldPriceStore = create<GoldPriceStore>((set) => ({
  optimisticRates: null,
  setOptimisticRates: (rates) => set({ optimisticRates: rates }),
  clearOptimisticRates: () => set({ optimisticRates: null }),
}));
