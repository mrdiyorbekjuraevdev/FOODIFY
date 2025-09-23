import { useFetch } from "@foodify/api/hooks/useFetch";
import { useQuery } from "@foodify/api/query";
import { useQueryState, parseAsString, parseAsIndex } from "nuqs";
import { useDebounce } from "@/hooks/useDebounce";
import { useBranchStore } from "@/stores/base";
import { TData } from "@/types/base";
import { QueryResult } from "@foodify/api/types";
import { TDepartment } from "@/types/main/departments";


interface IDepartmentsCache {
    departments: QueryResult<TData<TDepartment[]>>;
}

export const useDepartmentsCache = (): IDepartmentsCache => {
    const { functionInvoke } = useFetch();
    const { currentBranch } = useBranchStore();
    const [search] = useQueryState('search', parseAsString.withDefault(''));
    const [page] = useQueryState('page', parseAsIndex.withDefault(0));

    const debouncedSearch = useDebounce(search, 500);

    const key = `${currentBranch?.branch_id}/DEPARTMENTS?page=${page}&pageSize=${10}&search=${debouncedSearch}`;

    const departments = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const { data } = await functionInvoke<TData<TDepartment[]>>({
                functionName: `${currentBranch?.branch_id}/get/departments?page=${page}&pageSize=${10}&search=${debouncedSearch}`,
                method: "GET",
            });
            return data;
        },
    });
    return {
        departments,
    }
}