import { getQueryClient } from "@foodify/api/lib/get-query-client";
import { TBranch, TUser, TUserMe } from "@/types/base";
import { TDataSingle } from "@/types/base";
import { dehydrate } from "@foodify/api/query";
import { serverApi } from "@foodify/api/lib/server-client";
import { cookies } from "next/headers";

export const utilitiesCache = async () => {
    const queryClient = getQueryClient();
    const cookieStore = await cookies();

    await queryClient?.prefetchQuery({
        queryKey: ["branches"],
        queryFn: async () => {
            try {
                const { data } = await serverApi<TDataSingle<TBranch[]>>({
                    functionName: "get/branches",
                    method: "GET",
                    token: cookieStore.get("_foodify_auth")?.value,
                });

                return data?.data;
            } catch (error: unknown) {
                console.log(error)
            }
        },
        staleTime: Infinity,
    });

    await queryClient?.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () => {
            try {
                const { data } = await serverApi<TDataSingle<TUserMe>>({
                    functionName: "get/me",
                    method: "GET",
                    token: cookieStore.get("_foodify_auth")?.value,
                });

                return data?.data;
            } catch (error: unknown) {
                console.log(error)
            }
        },
        staleTime: Infinity,
    });
    return dehydrate(queryClient);
};



export const workersCache = async (params: { branch_id: string, search: string, page: number }) => {
    const queryClient = getQueryClient();
    const cookieStore = await cookies();

    await queryClient?.prefetchQuery({
        queryKey: [`${params.branch_id}/WORKERS?search=${params.search}&page=${params.page}&pageSize=10`],
        queryFn: async () => {
            try {
                const { data } = await serverApi<TDataSingle<TUser[]>>({
                    functionName: `${params.branch_id}/get/users?search=${params.search}&page=${params.page}&pageSize=10`,
                    method: "GET",
                    token: cookieStore.get("_foodify_auth")?.value,
                });
                return data?.data;
            } catch (error: unknown) {
                console.log(error)
            }
        },
        staleTime: Infinity,
    });

    return dehydrate(queryClient);
};

export const workerCache = async (params: { branch_id: string, id: string }) => {
    const queryClient = getQueryClient();
    const cookieStore = await cookies();

    await queryClient?.prefetchQuery({
        queryKey: [`${params.branch_id}/WORKER/${params.id}`],
        queryFn: async () => {
            try {
                const { data } = await serverApi<TDataSingle<TUser[]>>({
                    functionName: `${params.branch_id}/get/user/${params.id}`,
                    method: "GET",
                    token: cookieStore.get("_foodify_auth")?.value,
                });
                return data?.data;
            } catch (error: unknown) {
                console.log(error)
            }
        },
        staleTime: Infinity,
    });

    return dehydrate(queryClient);
};