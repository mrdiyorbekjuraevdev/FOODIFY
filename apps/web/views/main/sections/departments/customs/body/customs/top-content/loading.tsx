'use client'
import React, { memo } from 'react'
import { Skeleton } from '@foodify/design-system/components/skeleton';

export const Loading = memo(() => {

    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
                <Skeleton className="w-[200px] h-8 rounded-lg" />
                <Skeleton className="w-[100px] h-2 rounded-lg" />
            </div>
            <div className='w-full max-w-[30%] flex items-center gap-2'>
                <Skeleton className="w-full h-10 rounded-lg" />
                <Skeleton className="w-full h-10 rounded-lg" />
            </div>
        </div>
    )
})
