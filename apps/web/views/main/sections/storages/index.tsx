"use client"
import Body from "./customs/body";
import StorageModal from "./modals";
import { useStorageStore } from "@/stores/main/storages";
const Storages = () => {
    const { modal: { open } } = useStorageStore();
    return (
        <div className="p-4">
            <Body />
            {open && <StorageModal />}
        </div>
    )
}

export default Storages
