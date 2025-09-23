'use client'
import React, { memo } from 'react'
import { Input } from "@foodify/design-system/components/input";
import { DeleteIcon, SearchIcon } from '@/assets/icons/global/gloval.icons';
import { Button } from '@foodify/design-system/components/button';
import { useQueryState, parseAsString } from "nuqs";
import { Loading } from './loading';
import { Store, } from 'lucide-react';
import { useConfirm } from '@/components/confirm-actions';
import { get } from 'lodash';
import { useCategoriesCache } from '@/servers/main/categories';
import { useCategoryStore } from '@/stores/main/categories';
import { useCategoriesFeatures } from '../../../../features';

const TopContent = memo(() => {
    const { openModal, selectedKeys } = useCategoryStore();
    const confirm = useConfirm();

    const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
    const { categories: { data: categories, isLoading } } = useCategoriesCache();
    const { onRemoveCategory: { mutateAsync: onRemoveCategory } } = useCategoriesFeatures();

    if (isLoading && !search) {
        return <Loading />
    };

    const categoryIds = selectedKeys ? Array.from(selectedKeys) : [];


    const handleDelete = async () => {
        const ok = await confirm({
            title: "Remove selected categories",
            message: "This action cannot be undone.",
            confirmText: "Remove",
        });

        if (ok) {
            confirm.setLoading(true);
            await onRemoveCategory({ category_ids: categoryIds.map(id => String(id)) });
            confirm.setLoading(false);
            confirm.close();
        }
    }


    return (
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-xl font-bold'>Categories</h2>
                <p className='text-sm text-default-400'>Total categories: {categories?.data?.pagination?.total ?? 0}</p>
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
                        setSearch('');
                        openModal({})
                    }}
                >
                    <div className='flex items-center gap-2'>
                        <Store className='size-4' />
                        <span>Add category</span>
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