'use client'
import React, { memo } from 'react'
import { Input } from "@foodify/design-system/components/input";
import { SearchIcon } from '@/assets/icons/global/gloval.icons';

const TopContent = memo(() => {
    const [filterValue, setFilterValue] = React.useState('');
    const onSearchChange = (value: string) => setFilterValue(value);
    const onClear = () => setFilterValue('');
    return (
        <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold'>Workers</h2>
            <div className='w-full max-w-[30%]'>
                <Input
                    isClearable
                    className="w-full"
                    placeholder="Search by name..."
                    startContent={<SearchIcon />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
            </div>
        </div>
    )
})

export default TopContent;