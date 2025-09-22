import { useFetch } from "@foodify/api/hooks/useFetch";
import { useQuery } from "@foodify/api/query";
import { toast } from "sonner";
import { TData, TDataSingle } from "@/types/base";
import { QueryResult } from "@foodify/api/types";
import { TUser } from "@/types/base";
import { useBranchStore } from "@/stores/base";
import { useQueryState, parseAsString, parseAsIndex } from "nuqs";
import { useDebounce } from "@/hooks/useDebounce";
import { useParams } from "next/navigation";

type TWorkersCache = {
    workers: QueryResult<TData<TUser[]>>;
}

export const useWorkersCache = (): TWorkersCache => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const [search] = useQueryState('search', parseAsString.withDefault(''));
    const [page] = useQueryState('page', parseAsIndex.withDefault(0));
    const debouncedSearch = useDebounce(search, 500);
    /**
    * Query for fetching current user data 
    * @type {QueryResult<TData<TUser[]>>}
    */
    const workers = useQuery({
        queryKey: [`${currentBranch?.branch_id}/WORKERS?search=${debouncedSearch}&page=${page}&pageSize=10`],
        queryFn: async () => {
            try {
                const { data } = await functionInvoke<TData<TUser[]>>({
                    functionName: `${currentBranch?.branch_id}/get/users?search=${debouncedSearch}&page=${page}&pageSize=10`,
                    method: "GET",
                });

                return data;
            } catch (error: unknown) {
                toast.error("Error when fetching workers");
            }
        },
    });


    return {
        workers,
    }
}


type TWorkerCache = {
    worker: QueryResult<TDataSingle<TUser>>;
}

export const useWorkerCache = (): TWorkerCache => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const { id } = useParams()
    /**
    * Query for fetching current user data 
    * @type {QueryResult<TDataSingle<TUser>>}
    */
    const worker = useQuery({
        queryKey: [`${currentBranch?.branch_id}/WORKER/${id}`],
        queryFn: async () => {
            try {
                const { data } = await functionInvoke<TDataSingle<TUser>>({
                    functionName: `${currentBranch?.branch_id}/get/user/${id}`,
                    method: "GET",
                });

                return data;
            } catch (error: unknown) {
                toast.error("Error when fetching workers");
            }
        },
        // enabled: !!id && id !== "add",
    });


    return {
        worker,
    }

}



