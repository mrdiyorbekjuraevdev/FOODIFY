import { addToast } from "@foodify/design-system/components/toast";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { useBranchStore } from "@/stores/base";
import { useMutation } from "@foodify/api/query";
import { MutationResult } from "@foodify/api/types";
import { useDepartmentStore } from "@/stores/main/departments";
import { useDepartmentsListeners } from "../features";

type ON_ADD_DEPARTMENT = MutationResult<unknown, Error, { department: string, storage_id: string }, unknown>;
type ON_UPDATE_DEPARTMENT = MutationResult<unknown, Error, { department: string, storage_id: string }, unknown>;

type TUseDepartmentModalFeatures = {
    onAddDepartment: ON_ADD_DEPARTMENT;
    onUpdateDepartment: ON_UPDATE_DEPARTMENT;
}

export const useDepartmentModalFeatures = (): TUseDepartmentModalFeatures => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const { modal: { props }, closeModal } = useDepartmentStore();
    const { on_add_department, on_update_department } = useDepartmentsListeners()

    const onAddDepartment: ON_ADD_DEPARTMENT = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/add/department`,
                method: "POST",
                body: value,
            });
        },
        onSuccess: (_, __, context) => {
            closeModal();
            addToast({
                title: "Department added",
                description: "Department added successfully.",
                color: "success"
            });
            on_add_department();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Department added",
                description: error.message,
                color: "danger"
            });
            on_add_department();
        },
    });


    const onUpdateDepartment: ON_UPDATE_DEPARTMENT = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/update/department/${props?.department_id}`,
                method: "PATCH",
                body: value,
            });
        },
        onSuccess: (_, __, context) => {
            closeModal();
            addToast({
                title: "Department updated",
                description: "Department updated successfully.",
                color: "success"
            });
            on_update_department();
        },
        onError: (error, _, context) => {
            addToast({
                title: "Department updated",
                description: error.message,
                color: "danger"
            });
            on_update_department();
        },
    });
    return {
        onAddDepartment,
        onUpdateDepartment
    }
}
