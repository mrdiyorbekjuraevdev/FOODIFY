"use client"
import React, { memo } from 'react'
import { Pagination } from "@foodify/design-system/components/pagination";
import { useQueryState, parseAsIndex } from "nuqs";
import { Loading } from './loading';
import { useCategoriesCache } from "@/servers/main/categories";

export const BottomContent = memo(() => {
    const { categories: { data: categories, isLoading } } = useCategoriesCache();
    const [pageIndex, setPageIndex] = useQueryState('page', parseAsIndex.withDefault(1));

    if (isLoading) {
        return <Loading />
    }

    if (!categories?.data?.pagination?.total_pages || categories?.data?.pagination?.total_pages === 1) {
        return null;
    }
    return (
        <div className="flex items-center justify-center"><Pagination onChange={(e) => { setPageIndex(e) }} isDisabled={isLoading} showControls initialPage={pageIndex ?? 1} page={pageIndex ?? 1} total={categories?.data?.pagination?.total_pages || 0} title="Categories" /></div>
    );
})
