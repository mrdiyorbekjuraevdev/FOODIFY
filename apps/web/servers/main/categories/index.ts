import { useFetch } from "@foodify/api/hooks/useFetch";
import { useQuery } from "@foodify/api/query";
import { useQueryState, parseAsString, parseAsIndex } from "nuqs";
import { useDebounce } from "@/hooks/useDebounce";
import { useBranchStore } from "@/stores/base";
import { TData } from "@/types/base";
import { QueryResult } from "@foodify/api/types";
import { TCategory } from "@/types/main/categories";


interface ICategoriesCache {
    categories: QueryResult<TData<TCategory[]>>;
}

export const useCategoriesCache = (): ICategoriesCache => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const [search] = useQueryState('search', parseAsString.withDefault(''));
    const [page] = useQueryState('page', parseAsIndex.withDefault(0));

    const debouncedSearch = useDebounce(search, 500);

    const key = `${currentBranch?.branch_id}/CATEGORIES?page=${page}&pageSize=${10}&search=${debouncedSearch}`;

    const categories = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const { data } = await functionInvoke<TData<TCategory[]>>({
                functionName: `${currentBranch?.branch_id}/get/categories?page=${page}&pageSize=${10}&search=${debouncedSearch}`,
                method: "GET",
            });
            return data;
        },
    });
    return {
        categories,
    }
}