import { create } from "zustand";

interface GoldPriceStore {
  optimisticPrice: number | null;
  setOptimisticPrice: (price: number) => void;
  clearOptimisticPrice: () => void;
}

export const useGoldPriceStore = create<GoldPriceStore>((set) => ({
  optimisticPrice: null,
  setOptimisticPrice: (price) => set({ optimisticPrice: price }),
  clearOptimisticPrice: () => set({ optimisticPrice: null }),
}));
