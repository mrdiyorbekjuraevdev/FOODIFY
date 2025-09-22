import { useBranchStore } from "@/stores/base";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { useMutation, useQueryClient } from "@foodify/api/query";
import { MutationResult } from "@foodify/api/types";
import { addToast } from "@foodify/design-system/components/toast";

type TUseWorkersFeatures = {
    onRemoveWorker: ON_REMOVE_WORKER;
}

type DeleteWorkerParams = {
    user_ids: string[];
}

type ON_REMOVE_WORKER = MutationResult<unknown, Error, DeleteWorkerParams, unknown>;

export const useWorkersFeatures = (): TUseWorkersFeatures => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const queryClient = useQueryClient();
    const { on_remove_worker } = useWorkersListeners();


    const onRemoveWorker: ON_REMOVE_WORKER = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/delete/users`,
                method: "DELETE",
                body: value,
            });
        },
        onMutate: (values) => {
            queryClient.cancelQueries({
                queryKey: ["workers", currentBranch?.branch_id],
            });
            return { values };
        },
        onSuccess: (_, __, context) => {
            addToast({
                title: "Worker removed",
                description: "Worker removed successfully.",
                color: "success"
            });
            on_remove_worker();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Worker removed",
                description: error.message,
                color: "danger"
            });
        },
    });
    return {
        onRemoveWorker
    }
}


type TUseWorkersListeners = {
    on_add_worker: () => void;
    on_update_worker: () => void;
    on_remove_worker: () => void;
    on_update_selected_worker: () => void;
}

export const useWorkersListeners = (): TUseWorkersListeners => {
    const queryClient = useQueryClient();

    const on_add_worker = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("WORKERS")
                ),
        });
    }
    const on_update_worker = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("WORKERS")
                ),
        });
    }
    const on_remove_worker = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("WORKERS")
                ),
        });
    }

    const on_update_selected_worker = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("WORKER")
                ),
        });
    }
    return {
        on_add_worker,
        on_update_worker,
        on_remove_worker,
        on_update_selected_worker
    }
}