"use client"
import React, { memo } from 'react'
import { Skeleton } from "@foodify/design-system/components/skeleton";

export const Loading = memo(() => {
    return (
        <div className="flex items-center justify-center">
            <Skeleton className="w-[200px] h-10 rounded-lg" />
        </div>
    )
})
