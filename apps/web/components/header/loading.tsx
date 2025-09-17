"use client"
import { Skeleton } from '@foodify/design-system/components/skeleton';

export const Loading = () => {
    return (
        <div className="sticky top-0 z-50 bg-[var(--layer-01)] h-[65px] p-4 flex items-center shadow-md justify-between border-b-1 border-white dark:border-[#13181d]">
            <div>
                <Skeleton className="w-44 h-10 rounded-lg" />
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                </div>
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-24 h-10 rounded-lg" />
                <Skeleton className="w-10 h-10 rounded-lg" />
            </div>
        </div>
    )
}
