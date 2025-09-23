import { useBranchStore } from "@/stores/base";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { useMutation, useQueryClient } from "@foodify/api/query";
import { MutationResult } from "@foodify/api/types";
import { addToast } from "@foodify/design-system/components/toast";

type ON_REMOVE_CATEGORY = MutationResult<unknown, Error, { category_ids: string[] }, unknown>;

export const useCategoriesFeatures = () => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const { on_remove_category } = useCategoriesListeners()

    const onRemoveCategory: ON_REMOVE_CATEGORY = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/delete/categories`,
                method: "DELETE",
                body: value,
            });
        },
        onMutate: (values) => { },
        onSuccess: (_, __, context) => {
            addToast({
                title: "Category removed",
                description: "Category removed successfully.",
                color: "success"
            });
            on_remove_category();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Category removed",
                description: error.message,
                color: "danger"
            });
            on_remove_category();
        },
    });
    return {
        onRemoveCategory
    }
}


type TUseCategoriesListeners = {
    on_add_category: () => void;
    on_update_category: () => void;
    on_remove_category: () => void;
}

export const useCategoriesListeners = (): TUseCategoriesListeners => {
    const queryClient = useQueryClient();

    const on_add_category = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("CATEGORIES")
                ),
        });
    }
    const on_update_category = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("CATEGORIES")
                ),
        });
    }
    const on_remove_category = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("CATEGORIES")
                ),
        });
    }
    return {
        on_add_category,
        on_update_category,
        on_remove_category
    }
}