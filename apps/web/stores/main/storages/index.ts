import { TStorage } from "@/types/main/storages"
import { create } from "zustand";
import { Selection } from "@foodify/design-system/components/table";


type StorageStore = {
    modal: { open: boolean, props: Partial<TStorage> | null };
    openModal: (props: Partial<TStorage> | null) => void;
    closeModal: () => void;
    selectedKeys: Selection;
    setSelectedKeys: (keys: Selection) => void;
}

export const useStorageStore = create<StorageStore>((set) => ({
    modal: { open: false, props: null },
    openModal: (props) => set({ modal: { open: true, props } }),
    closeModal: () => set({ modal: { open: false, props: null } }),
    selectedKeys: new Set([]) as Selection,
    setSelectedKeys: (keys: Selection) => set({ selectedKeys: keys }),
}));