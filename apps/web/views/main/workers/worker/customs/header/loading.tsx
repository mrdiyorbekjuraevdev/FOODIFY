import React from 'react'
import { Skeleton } from '@foodify/design-system/components/skeleton'

const Loading = () => {
    return (
        <div>
            <Skeleton className='w-[20%] h-8 rounded-lg ' />
        </div>
    )
}

export default Loading
