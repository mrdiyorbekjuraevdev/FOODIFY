import { TDepartment } from "@/types/main/departments"
import { create } from "zustand";
import { Selection } from "@foodify/design-system/components/table";


type DepartmentStore = {
    modal: { open: boolean, props: Partial<TDepartment> | null };
    openModal: (props: Partial<TDepartment> | null) => void;
    closeModal: () => void;
    selectedKeys: Selection;
    setSelectedKeys: (keys: Selection) => void;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
    modal: { open: false, props: null },
    openModal: (props) => set({ modal: { open: true, props } }),
    closeModal: () => set({ modal: { open: false, props: null } }),
    selectedKeys: new Set([]) as Selection,
    setSelectedKeys: (keys: Selection) => set({ selectedKeys: keys }),
}));