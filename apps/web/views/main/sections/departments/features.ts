import { useBranchStore } from "@/stores/base";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { useMutation, useQueryClient } from "@foodify/api/query";
import { MutationResult } from "@foodify/api/types";
import { addToast } from "@foodify/design-system/components/toast";

type ON_REMOVE_DEPARTMENT = MutationResult<unknown, Error, { department_ids: string[] }, unknown>;

export const useDepartmentsFeatures = () => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const { on_remove_department } = useDepartmentsListeners()

    const onRemoveDepartment: ON_REMOVE_DEPARTMENT = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/delete/departments`,
                method: "DELETE",
                body: value,
            });
        },
        onMutate: (values) => { },
        onSuccess: (_, __, context) => {
            addToast({
                title: "Department removed",
                description: "Department removed successfully.",
                color: "success"
            });
            on_remove_department();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Department removed",
                description: error.message,
                color: "danger"
            });
            on_remove_department();
        },
    });
    return {
        onRemoveDepartment
    }
}


type TUseCategoriesListeners = {
    on_add_department: () => void;
    on_update_department: () => void;
    on_remove_department: () => void;
}

export const useDepartmentsListeners = (): TUseCategoriesListeners => {
    const queryClient = useQueryClient();

    const on_add_department = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("DEPARTMENTS")
                ),
        });
    }
    const on_update_department = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("DEPARTMENTS")
                ),
        });
    }
    const on_remove_department = () => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                query.queryKey.some((key) =>
                    typeof key === "string" && key.includes("DEPARTMENTS")
                ),
        });
    }
    return {
        on_add_department,
        on_update_department,
        on_remove_department
    }
}