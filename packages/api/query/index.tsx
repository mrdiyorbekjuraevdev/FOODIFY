"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const CacheQueryProvider = ({ children, client }: { children: React.ReactNode, client: QueryClient }) => {
    return (
        <QueryClientProvider client={client}><ReactQueryDevtools />{children}</QueryClientProvider>
    )
}



export { CacheQueryProvider, useQueryClient, useMutation, QueryClient }