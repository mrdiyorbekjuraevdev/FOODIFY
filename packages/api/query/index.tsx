import React, { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQueryClient, useMutation, useQuery, dehydrate, HydrationBoundary } from "@tanstack/react-query";

type CacheQueryProviderProps = PropsWithChildren<{
    client: QueryClient;
}>;
const CacheQueryProvider = ({ children, client }: CacheQueryProviderProps) => {
    return (
        // @ts-ignore
        <QueryClientProvider client={client}><ReactQueryDevtools />{children}</QueryClientProvider>
    )
}



export { CacheQueryProvider, useQueryClient, useMutation, QueryClient, useQuery, dehydrate, HydrationBoundary }