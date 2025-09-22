import { addToast } from "@foodify/design-system/components/toast";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { useBranchStore } from "@/stores/base";
import { useMutation } from "@foodify/api/query";
import { MutationResult } from "@foodify/api/types";
import { useStorageStore } from "@/stores/main/storages";
import { useStoragesListeners } from "../features";

type ON_ADD_STORAGE = MutationResult<unknown, Error, { storage: string }, unknown>;
type ON_UPDATE_STORAGE = MutationResult<unknown, Error, { storage: string }, unknown>;

type TUseStorageModalFeatures = {
    onAddStorage: ON_ADD_STORAGE;
    onUpdateStorage: ON_UPDATE_STORAGE;
}

export const useStorageModalFeatures = (): TUseStorageModalFeatures => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const { modal: { props }, closeModal } = useStorageStore();
    const { on_add_storage, on_update_storage } = useStoragesListeners()

    const onAddStorage: ON_ADD_STORAGE = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/add/storage`,
                method: "POST",
                body: value,
            });
        },
        onSuccess: (_, __, context) => {
            closeModal();
            addToast({
                title: "Storage added",
                description: "Storage added successfully.",
                color: "success"
            });
            on_add_storage();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Storage added",
                description: error.message,
                color: "danger"
            });
            on_add_storage();
        },
    });


    const onUpdateStorage: ON_UPDATE_STORAGE = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/update/storage/${props?.storage_id}`,
                method: "PATCH",
                body: value,
            });
        },
        onSuccess: (_, __, context) => {
            closeModal();
            addToast({
                title: "Storage updated",
                description: "Storage updated successfully.",
                color: "success"
            });
            on_update_storage();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Storage updated",
                description: error.message,
                color: "danger"
            });
            on_update_storage();
        },
    });
    return {
        onAddStorage,
        onUpdateStorage
    }
}
