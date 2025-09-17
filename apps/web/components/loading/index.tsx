import { Loader } from 'lucide-react'
import React from 'react'

export const Loading = () => {
    return (
        <div className='flex items-center justify-center gap-2 h-screen'><Loader className='animate-spin text-zinc-500' /> <span>Loading...</span></div>
    )
}
