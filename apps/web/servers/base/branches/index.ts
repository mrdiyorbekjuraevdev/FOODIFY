import { useFetch } from "@foodify/api/hooks/useFetch";
import { useQuery } from "@foodify/api/query";
import { toast } from "sonner";
import { TDataSingle } from "@/types/base";
import { QueryResult } from "@foodify/api/types";
import { TBranch } from "@/types/base";

type TBranchesCache = {
    branches: QueryResult<TBranch[]>;
}

export const useBranchesCache = (): TBranchesCache => {
    const { functionInvoke } = useFetch();

    /**
    * Query for fetching current user data
    * @type {QueryResult<TBranch[]>}
    */
    const branches = useQuery({
        queryKey: ["branches"],
        queryFn: async () => {
            try {
                const { data } = await functionInvoke<TDataSingle<TBranch[]>>({
                    functionName: "get/branches",
                    method: "GET",
                });

                return data?.data;
            } catch (error: unknown) {
                toast.error("Error when fetching branches");
            }
        },
    });

    return {
        branches,
    }
}


