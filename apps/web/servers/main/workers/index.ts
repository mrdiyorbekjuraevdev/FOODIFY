import { useFetch } from "@foodify/api/hooks/useFetch";
import { useQuery } from "@foodify/api/query";
import { toast } from "sonner";
import { TData } from "@/types/base";
import { QueryResult } from "@foodify/api/types";
import { TUser } from "@/types/base";
import { useBranchStore } from "@/stores/base";

type TWorkersCache = {
    workers: QueryResult<TUser[]>;
}

export const useWorkersCache = (): TWorkersCache => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();

    /**
    * Query for fetching current user data
    * @type {QueryResult<TUser[]>}
    */
    const workers = useQuery({
        queryKey: [`${currentBranch?.branch_id}/WORKERS`],
        queryFn: async () => {
            try {
                const { data } = await functionInvoke<TData<TUser[]>>({
                    functionName: `${currentBranch?.branch_id}/get/users`,
                    method: "GET",
                });

                return data?.data;
            } catch (error: unknown) {
                toast.error("Error when fetching workers");
            }
        },
    });

    return {
        workers,
    }
}