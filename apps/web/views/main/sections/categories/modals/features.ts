import { addToast } from "@foodify/design-system/components/toast";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { useBranchStore } from "@/stores/base";
import { useMutation } from "@foodify/api/query";
import { MutationResult } from "@foodify/api/types";
import { useCategoryStore } from "@/stores/main/categories";
import { useCategoriesListeners } from "../features";

type ON_ADD_CATEGORY = MutationResult<unknown, Error, { category: string, department_id: string }, unknown>;
type ON_UPDATE_CATEGORY = MutationResult<unknown, Error, { category: string, department_id: string }, unknown>;

type TUseCategoryModalFeatures = {
    onAddCategory: ON_ADD_CATEGORY;
    onUpdateCategory: ON_UPDATE_CATEGORY;
}

export const useCategoryModalFeatures = (): TUseCategoryModalFeatures => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const { modal: { props }, closeModal } = useCategoryStore();
    const { on_add_category, on_update_category } = useCategoriesListeners()

    const onAddCategory: ON_ADD_CATEGORY = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/add/category`,
                method: "POST",
                body: value,
            });
        },
        onSuccess: (_, __, context) => {
            closeModal();
            addToast({
                title: "Category added",
                description: "Category added successfully.",
                color: "success"
            });
            on_add_category();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Category added",
                description: error.message,
                color: "danger"
            });
            on_add_category();
        },
    });


    const onUpdateCategory: ON_UPDATE_CATEGORY = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/update/category/${props?.category_id}`,
                method: "PATCH",
                body: value,
            });
        },
        onSuccess: (_, __, context) => {
            closeModal();
            addToast({
                title: "Category updated",
                description: "Category updated successfully.",
                color: "success"
            });
            on_update_category();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Category updated",
                description: error.message,
                color: "danger"
            });
            on_update_category();
        },
    });
    return {
        onAddCategory,
        onUpdateCategory
    }
}
