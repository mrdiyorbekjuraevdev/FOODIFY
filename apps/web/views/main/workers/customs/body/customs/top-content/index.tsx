'use client'
import React, { memo, useMemo } from 'react'
import { Input } from "@foodify/design-system/components/input";
import { DeleteIcon, SearchIcon } from '@/assets/icons/global/gloval.icons';
import { Button } from '@foodify/design-system/components/button';
import { useQueryState, parseAsString } from "nuqs";
import { useWorkersCache } from "@/servers/main/workers";
import { Loading } from './loading';
import { UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWorkersStore } from '@/stores/main/workers';
import { useConfirm } from '@/components/confirm-actions';
import { useWorkersFeatures } from '@/views/main/workers/features';
import { get } from 'lodash';
import { Protect } from '@/components/protect';
import { Spinner } from '@foodify/design-system/components/spinner';

const TopContent = memo(() => {
    const confirm = useConfirm();
    const router = useRouter();
    const { selectedKeys } = useWorkersStore()
    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
    const { workers: { data: workers, isLoading } } = useWorkersCache();
    const { onRemoveWorker: { mutateAsync: onRemove } } = useWorkersFeatures();

    if (isLoading && !search) {
        return <Loading />
    };

    const userIds = selectedKeys ? Array.from(selectedKeys) : [];

    const handleDelete = async () => {
        const ok = await confirm({
            title: "Remove selected workers",
            message: "This action cannot be undone.",
            confirmText: "Remove",
        });

        if (ok) {
            confirm.setLoading(true);
            await onRemove({ user_ids: userIds.map(id => String(id)) });
            confirm.setLoading(false);
            confirm.close();
        }
    }


    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-xl font-bold'>Workers</h2>
                <p className='text-sm text-default-400'>Total workers: {workers?.data?.pagination?.total ?? 0}</p>
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
                <Protect resource='User' actions={['add']} loading={<Spinner />}>
                    <Button
                        onPress={() => router.push("/workers/add")}
                        color="success"
                        className='text-white px-8'
                    >
                        <div className='flex items-center gap-2'>
                            <UserPlus className='size-4' />
                            <span>Add worker</span>
                        </div>
                    </Button>
                </Protect>
                {Boolean(get(selectedKeys, "size")) && <Protect resource='User' actions={['delete']}>
                    <Button
                        onPress={() => handleDelete()}
                        color="danger"
                        isIconOnly
                        className='text-white'
                    >
                        <DeleteIcon />
                    </Button>
                </Protect>}
            </div>
        </div>
    )
})

export default TopContent;