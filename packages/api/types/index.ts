import { InfiniteData, UseInfiniteQueryResult, UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export type MutationResult<A = unknown, B = Error, C = unknown, D = unknown> = UseMutationResult<
    A,
    B,
    C,
    D
>;

export type QueryResult<T> = UseQueryResult<T | null | undefined, Error>;

export type InfiniteQueryResult<T> = UseInfiniteQueryResult<InfiniteData<T | null | undefined>>;