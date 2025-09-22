import { useMutation } from "@foodify/api/query";
import { MutationResult } from "@foodify/api/types";
import { useFetch } from "@foodify/api/hooks/useFetch";
import { WorkerFormValues } from "@/model/main/workers";
import { useBranchStore } from "@/stores/base";
import { useParams } from "next/navigation";
import { useWorkersListeners } from "../features";
import { addToast } from "@foodify/design-system/components/toast";
import { useRouter } from "next/navigation";

type ON_ADD_WORKER = MutationResult<unknown, Error, WorkerFormValues, unknown>;
type ON_UPDATE_WORKER = MutationResult<unknown, Error, WorkerFormValues, unknown>;



export const useWorkerFeatures = () => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const { id } = useParams();
    const { on_add_worker, on_update_worker, on_update_selected_worker } = useWorkersListeners();
    const router = useRouter();

    const onAddWorker: ON_ADD_WORKER = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `add/user`,
                method: "POST",
                body: value,
            });
        },
        onMutate: (values) => {
            // const toastId = toast.loading("Inviting...");

            // if (!values?.isCreateMode) {
            //     onClose();
            // }

            // return { toastId };
        },
        onSuccess: (_, __, context) => {
            addToast({
                title: "Worker added",
                description: "Worker added successfully",
                color: "success",
            });
            on_add_worker();
            on_update_selected_worker();
            router.push("/workers");
        },
        onError: (error, _, context) => {
            addToast({
                title: "Worker added",
                description: "Error adding worker",
                color: "danger",
            });
        },
    });

    const onUpdateWorker: ON_UPDATE_WORKER = useMutation({
        mutationFn: async (value) => {
            await functionInvoke({
                functionName: `${currentBranch?.branch_id}/update/user/${id}`,
                method: "PATCH",
                body: value,
            });
        },
        onMutate: (values) => {
            // const toastId = toast.loading("Inviting...");

            // if (!values?.isCreateMode) {
            //     onClose();
            // }

            // return { toastId };
        },
        onSuccess: (_, __, context) => {
            addToast({
                title: "Worker updated",
                description: "Worker updated successfully",
                color: "success",
            });
            on_update_worker();
            on_update_selected_worker();
            router.push("/workers");
        },
        onError: (error, _, context) => {
            addToast({
                title: "Worker updated",
                description: "Error updating worker",
                color: "danger",
            });
        },
    });

    return {
        onAddWorker,
        onUpdateWorker,
    }
}




