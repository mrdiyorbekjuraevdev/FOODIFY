import { useFetch } from "@foodify/api/hooks/useFetch";
import { useQuery } from "@foodify/api/query";
import { useQueryState, parseAsString, parseAsIndex } from "nuqs";
import { useDebounce } from "@/hooks/useDebounce";
import { useBranchStore } from "@/stores/base";
import { TData } from "@/types/base";
import { TStorage } from "@/types/main/storages";
import { QueryResult } from "@foodify/api/types";


interface IStoragesCache {
    storages: QueryResult<TData<TStorage[]>>;
}

export const useStoragesCache = (): IStoragesCache => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const [search] = useQueryState('search', parseAsString.withDefault(''));
    const [page] = useQueryState('page', parseAsIndex.withDefault(0));

    const debouncedSearch = useDebounce(search, 500);

    const key = `${currentBranch?.branch_id}/STORAGES?page=${page}&pageSize=${10}&search=${debouncedSearch}`;

    const storages = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const { data } = await functionInvoke<TData<TStorage[]>>({
                functionName: `${currentBranch?.branch_id}/get/storages?page=${page}&pageSize=${10}&search=${debouncedSearch}`,
                method: "GET",
            });
            return data;
        },
    });
    return {
        storages,
    }
}