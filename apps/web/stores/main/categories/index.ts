import { TCategory } from "@/types/main/categories"
import { create } from "zustand";
import { Selection } from "@foodify/design-system/components/table";


type CategoryStore = {
    modal: { open: boolean, props: Partial<TCategory> | null };
    openModal: (props: Partial<TCategory> | null) => void;
    closeModal: () => void;
    selectedKeys: Selection;
    setSelectedKeys: (keys: Selection) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    modal: { open: false, props: null },
    openModal: (props) => set({ modal: { open: true, props } }),
    closeModal: () => set({ modal: { open: false, props: null } }),
    selectedKeys: new Set([]) as Selection,
    setSelectedKeys: (keys: Selection) => set({ selectedKeys: keys }),
}));