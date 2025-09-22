"use client"
import React, { memo } from 'react'
import { Pagination } from "@foodify/design-system/components/pagination";
import { useStoragesCache } from "@/servers/main/storages";
import { useQueryState, parseAsIndex } from "nuqs";
import { Loading } from './loading';

export const BottomContent = memo(() => {
    const { storages: { data: storages, isLoading } } = useStoragesCache();
    const [pageIndex, setPageIndex] = useQueryState('page', parseAsIndex.withDefault(1));

    if (isLoading) {
        return <Loading />
    }

    if (!storages?.data?.pagination?.total_pages || storages?.data?.pagination?.total_pages === 1) {
        return null;
    }
    return (
        <div className="flex items-center justify-center"><Pagination onChange={(e) => { setPageIndex(e) }} isDisabled={isLoading} showControls initialPage={pageIndex ?? 1} page={pageIndex ?? 1} total={storages?.data?.pagination?.total_pages || 0} title="Storages" /></div>
    );
})
