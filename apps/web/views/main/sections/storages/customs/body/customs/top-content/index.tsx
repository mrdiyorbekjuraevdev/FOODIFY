'use client'
import React, { memo } from 'react'
import { Input } from "@foodify/design-system/components/input";
import { DeleteIcon, SearchIcon } from '@/assets/icons/global/gloval.icons';
import { Button } from '@foodify/design-system/components/button';
import { useQueryState, parseAsString } from "nuqs";
import { useWorkersCache } from "@/servers/main/workers";
import { Loading } from './loading';
import { Store, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWorkersStore } from '@/stores/main/workers';
import { useConfirm } from '@/components/confirm-actions';
import { useWorkersFeatures } from '@/views/main/workers/features';
import { useStorageStore } from '@/stores/main/storages';
import { useStoragesFeatures } from '../../../../features';
import { useStoragesCache } from '@/servers/main/storages';
import { get } from 'lodash';

const TopContent = memo(() => {
    const { openModal, selectedKeys } = useStorageStore();
    const confirm = useConfirm();
    const router = useRouter();

    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
    const { storages: { data: storages, isLoading } } = useStoragesCache();
    const { onRemoveStorage: { mutateAsync: onRemove } } = useStoragesFeatures();

    if (isLoading && !search) {
        return <Loading />
    };

    const storageIds = selectedKeys ? Array.from(selectedKeys) : [];


    const handleDelete = async () => {
        const ok = await confirm({
            title: "Remove selected storages",
            message: "This action cannot be undone.",
            confirmText: "Remove",
        });

        if (ok) {
            confirm.setLoading(true);
            await onRemove({ storage_ids: storageIds.map(id => String(id)) });
            confirm.setLoading(false);
            confirm.close();
        }
    }


    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-xl font-bold'>Storages</h2>
                <p className='text-sm text-default-400'>Total storages: {storages?.data?.pagination?.total ?? 0}</p>
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
                    onPress={() => openModal({})}
                >
                    <div className='flex items-center gap-2'>
                        <Store className='size-4' />
                        <span>Add storage</span>
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