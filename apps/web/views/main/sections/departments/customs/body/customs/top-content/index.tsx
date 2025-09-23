'use client'
import React, { memo } from 'react'
import { Input } from "@foodify/design-system/components/input";
import { DeleteIcon, SearchIcon } from '@/assets/icons/global/gloval.icons';
import { Button } from '@foodify/design-system/components/button';
import { useQueryState, parseAsString } from "nuqs";
import { Loading } from './loading';
import { Store, } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/components/confirm-actions';
import { get } from 'lodash';
import { useDepartmentStore } from '@/stores/main/departments';
import { useDepartmentsCache } from '@/servers/main/departments';
import { useDepartmentsFeatures } from '../../../../features';

const TopContent = memo(() => {
    const { openModal, selectedKeys } = useDepartmentStore();
    const confirm = useConfirm();
    const router = useRouter();
    const { onRemoveDepartment: { mutateAsync: onRemove } } = useDepartmentsFeatures();
    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
    const { departments: { data: departments, isLoading } } = useDepartmentsCache();

    if (isLoading && !search) {
        return <Loading />
    };

    const departmentIds = selectedKeys ? Array.from(selectedKeys) : [];


    const handleDelete = async () => {
        const ok = await confirm({
            title: "Remove selected departments",
            message: "This action cannot be undone.",
            confirmText: "Remove",
        });

        if (ok) {
            confirm.setLoading(true);
            onRemove({ department_ids: departmentIds.map(id => String(id)) });
            confirm.setLoading(false);
            confirm.close();
        }
    }


    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-xl font-bold'>Departments</h2>
                <p className='text-sm text-default-400'>Total departments: {departments?.data?.pagination?.total ?? 0}</p>
            </div>
            <div className='w-full max-w-[39%] flex items-center gap-2'>
                <Input
                    isClearable
                    className="w-full"
                    placeholder="Search by name..."
                    startContent={<SearchIcon />}
                    value={String(search)}
                    onClear={() => setSearch('')}
                    onValueChange={(e) => setSearch(String(e))}
                />
                <Button
                    color="success"
                    className='text-white px-8'
                    onPress={() => {
                        setSearch('')
                        openModal({})
                    }}
                >
                    <div className='flex items-center gap-2'>
                        <Store className='size-4' />
                        <span>Add department</span>
                    </div>
                </Button>
                {Boolean(get(selectedKeys, "size")) && <Button
                    onPress={() => handleDelete()}
                    color="danger"
                    isIconOnly
                    className='text-white'
                >
                    <DeleteIcon />
                </Button>}
            </div>
        </div>
    )
})

export default TopContent;