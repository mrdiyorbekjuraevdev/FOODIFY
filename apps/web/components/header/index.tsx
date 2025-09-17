"use client";
import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@foodify/design-system/components/button';
import { Badge } from '@foodify/design-system/components/badge';
import { DarkModeIcon, LightModeIcon } from '@/assets/icons/global/mode.icon';
import { NotificationIcon } from '@/assets/icons/header/notification.icon';
import { useTheme } from '@foodify/design-system/hooks';
import { UserDropdown } from './customs/user-dropdown';
import { LanguageSwitcher } from '../language-switcher';
import { Popover, PopoverContent, PopoverTrigger } from '@foodify/design-system/components/popover';
import { Avatar } from '@foodify/design-system/components/avatar';
import { Divider } from '@foodify/design-system/components/divider';
import { Listbox, ListboxItem } from '@foodify/design-system/components/listbox';
import { Plus } from 'lucide-react';
import { useBranchesCache } from '@/servers/base/branches';
import { useBranchStore } from '@/stores/base';
import { Loading } from './loading';

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[360px] p-1 rounded-small max-h-[400px] overflow-y-scroll">
        {children}
    </div>
);

export const Header = () => {
    const { branches: { data: branches, isLoading } } = useBranchesCache();
    const { setTheme, theme } = useTheme();
    const { currentBranch, setCurrentBranch } = useBranchStore();
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Memoize the branch selection to prevent unnecessary re-renders
    const selectBranch = useCallback((branchId: string) => {
        const selectedBranch = branches?.find((el) => el.branch_id === branchId) ?? null;
        setCurrentBranch(selectedBranch);
    }, [branches, setCurrentBranch]);

    // Set initial branch only once when data loads
    useEffect(() => {
        if (isLoading || !branches || branches.length === 0) return;

        // Only set initial branch if none is selected yet
        if (isInitialLoad && !currentBranch) {
            setCurrentBranch(branches[0]);
            setIsInitialLoad(false);
        }
    }, [branches, isLoading, currentBranch, setCurrentBranch, isInitialLoad]);

    if (isLoading) return <Loading />;

    return (
        <div className="sticky top-0 z-50 bg-[var(--layer-01)] h-[65px] p-4 flex items-center shadow-md justify-between border-b-1 border-white dark:border-[#13181d]">
            <div>
                <Popover placement="bottom-start" showArrow={true}>
                    <PopoverTrigger className='cursor-pointer rounded-lg'>
                        <div className='flex items-center gap-2 p-2'>
                            <Avatar size='sm' radius="lg" src={currentBranch?.img || ""} />
                            <div className="flex flex-col gap-3">
                                <p className='text-lg leading-1.5 font-semibold text-start'>{currentBranch?.branch || "Select a branch"}</p>
                                <p className='text-xs leading-1.5 font-semibold text-zinc-500'>{currentBranch?.address ?? "Branch address not provided"}</p>
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className='w-[360px] overflow-hidden pb-0 border-zinc-500'>
                        <div className="px-1">
                            <p className="text-small font-semibold px-4 py-2">Branches</p>
                            <Divider />
                            <ListboxWrapper>
                                <Listbox
                                    disallowEmptySelection
                                    aria-label="Single selection example"
                                    selectedKeys={currentBranch?.branch_id ? new Set([currentBranch.branch_id]) : new Set()}
                                    selectionMode="single"
                                    variant="flat"
                                    onSelectionChange={(keys) => {
                                        const selectedKey = Array.from(keys as Set<string>)[0];
                                        if (selectedKey) {
                                            selectBranch(selectedKey);
                                        }
                                    }}
                                >
                                    {branches?.map((el) => (
                                        <ListboxItem key={el.branch_id} textValue={el.branch}>
                                            <div className="flex gap-2 items-center">
                                                <Avatar alt={el.branch} className="shrink-0" size="sm" src={el?.img || ""} />
                                                <div className="flex flex-col">
                                                    <span className="text-small">{el.branch}</span>
                                                    <span className="text-tiny text-default-400">{el.address}</span>
                                                </div>
                                            </div>
                                        </ListboxItem>
                                    )) || []}
                                </Listbox>
                            </ListboxWrapper>
                            <Divider />
                            <div className="flex items-center gap-2 overflow-hidden">
                                <Button variant="light" startContent={<Avatar size='sm' fallback={<Plus size={16} strokeWidth={1.5} />} />} className='w-full rounded-none text-md '>Create New Branch</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                    {theme === "dark" ? (
                        <Button
                            onPress={() => setTheme("light")}
                            isIconOnly
                            startContent={<LightModeIcon />}
                        ></Button>
                    ) : (
                        <Button
                            onPress={() => setTheme("dark")}
                            isIconOnly
                            startContent={<DarkModeIcon />}
                        ></Button>
                    )}
                </div>
                <Badge color="danger" content={5} isInvisible={false} shape="circle">
                    <NotificationIcon className="fill-current" size={30} />
                </Badge>
                <UserDropdown />
                <LanguageSwitcher />
            </div>
        </div>
    )
}