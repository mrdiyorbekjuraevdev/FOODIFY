"use client"
import { Button } from "@foodify/design-system/components/button"
import { XIcon } from 'lucide-react'
import { useStorageStore } from "@/stores/main/storages";

const Header = () => {
    const { closeCanvas } = useStorageStore();
    return (
        <div className='flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-4 h-12'>
            <h3 className='text-lg font-semibold'>Storage Details</h3>
            <Button variant="light" size='sm' isIconOnly onPress={() => closeCanvas()}>
                <XIcon className="size-4" />
            </Button>
        </div>
    )
}

export default Header