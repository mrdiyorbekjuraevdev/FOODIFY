"use client"
import React, { memo } from 'react'
import { Pagination } from "@foodify/design-system/components/pagination";
import { useQueryState, parseAsIndex } from "nuqs";
import { Loading } from './loading';
import { useDepartmentsCache } from "@/servers/main/departments";

export const BottomContent = memo(() => {
    const { departments: { data: departments, isLoading } } = useDepartmentsCache();
    const [pageIndex, setPageIndex] = useQueryState('page', parseAsIndex.withDefault(1));

    if (isLoading) {
        return <Loading />
    }

    if (!departments?.data?.pagination?.total_pages || departments?.data?.pagination?.total_pages === 1) {
        return null;
    }
    return (
        <div className="flex items-center justify-center"><Pagination onChange={(e) => { setPageIndex(e) }} isDisabled={isLoading} showControls initialPage={pageIndex ?? 1} page={pageIndex ?? 1} total={departments?.data?.pagination?.total_pages || 0} title="Departments" /></div>
    );
})
