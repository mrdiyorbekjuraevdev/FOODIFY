import { create } from "zustand";
import { Selection } from "@foodify/design-system/components/table"
type TWorkerStore = {
    selectedKeys: Selection;
    setSelectedKeys: (keys: Selection) => void;
    clearSelection: () => void;
};

export const useWorkersStore = create<TWorkerStore>((set) => ({
    selectedKeys: new Set([]) as Selection,
    setSelectedKeys: (keys: Selection) => set({ selectedKeys: keys }),
    clearSelection: () => set({ selectedKeys: new Set([]) as Selection }),
}));
