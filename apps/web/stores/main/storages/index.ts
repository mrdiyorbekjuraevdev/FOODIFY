import { TStorage } from "@/types/main/storages"
import { create } from "zustand";
import { Selection } from "@foodify/design-system/components/table";


type StorageStore = {
    modal: { open: boolean, props: Partial<TStorage> | null };
    canvas: { open: boolean, props: Partial<any> | null };
    openModal: (props: Partial<TStorage> | null) => void;
    closeModal: () => void;
    selectedKeys: Selection;
    setSelectedKeys: (keys: Selection) => void;
    openCanvas: () => void;
    closeCanvas: () => void;
}

export const useStorageStore = create<StorageStore>((set) => ({
    modal: { open: false, props: null },
    openModal: (props) => set({ modal: { open: true, props } }),
    closeModal: () => set({ modal: { open: false, props: null } }),
    selectedKeys: new Set([]) as Selection,
    setSelectedKeys: (keys: Selection) => set({ selectedKeys: keys }),
    canvas: { open: false, props: null },
    openCanvas: () => set({ canvas: { open: true, props: null } }),
    closeCanvas: () => set({ canvas: { open: false, props: null } }),
}));