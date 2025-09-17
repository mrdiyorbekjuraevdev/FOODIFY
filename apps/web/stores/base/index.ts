import { TBranch } from "@/types/base";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BranchStore {
    currentBranch: TBranch | null;
    setCurrentBranch: (branch: TBranch | null) => void;
    clearCurrentBranch: () => void;
}


export const useBranchStore = create<BranchStore>()(
    persist(
        (set) => ({
            currentBranch: null,

            setCurrentBranch: (branch) => set({ currentBranch: branch }),

            clearCurrentBranch: () => set({ currentBranch: null }),
        }),
        {
            name: 'current-branch',
        }
    )
);
