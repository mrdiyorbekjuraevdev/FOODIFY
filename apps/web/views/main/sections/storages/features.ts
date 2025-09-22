import { useBranchStore } from "@/stores/base";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { useMutation, useQueryClient } from "@foodify/api/query";
import { MutationResult } from "@foodify/api/types";
import { addToast } from "@foodify/design-system/components/toast";

type ON_REMOVE_STORAGE = MutationResult<unknown, Error, { storage_ids: string[] }, unknown>;

export const useStoragesFeatures = () => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const { on_remove_storage } = useStoragesListeners()

    const onRemoveStorage: ON_REMOVE_STORAGE = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/delete/storages`,
                method: "DELETE",
                body: value,
            });
        },
        onMutate: (values) => { },
        onSuccess: (_, __, context) => {
            addToast({
                title: "Storage removed",
                description: "Storage removed successfully.",
                color: "success"
            });
            on_remove_storage();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Storage removed",
                description: error.message,
                color: "danger"
            });
            on_remove_storage();
        },
    });
    return {
        onRemoveStorage
    }
}


type TUseStoragesListeners = {
    on_add_storage: () => void;
    on_update_storage: () => void;
    on_remove_storage: () => void;
}

export const useStoragesListeners = (): TUseStoragesListeners => {
    const queryClient = useQueryClient();

    const on_add_storage = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("STORAGES")
                ),
        });
    }
    const on_update_storage = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("STORAGES")
                ),
        });
    }
    const on_remove_storage = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("STORAGES")
                ),
        });
    }
    return {
        on_add_storage,
        on_update_storage,
        on_remove_storage
    }
}