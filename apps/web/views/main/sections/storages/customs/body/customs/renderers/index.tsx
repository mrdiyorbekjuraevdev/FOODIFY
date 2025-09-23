"use client"
import { Tooltip } from "@foodify/design-system/components/tooltip";
import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { memo } from "react";
import { EditIcon } from "@/assets/icons/edit.icon";

import { useConfirm } from "@/components/confirm-actions";
import { addToast } from "@foodify/design-system/components/toast";
import { TStorage } from "@/types/main/storages";
import { Typography } from "@foodify/design-system/components/typography";
import { useStorageStore } from "@/stores/main/storages";
import { useStoragesFeatures } from "../../../../features";
import { Button } from "@foodify/design-system/components/button";

const NameRenderer = memo(({ storage }: { storage: TStorage }) => (
    <div className="gap-2 grid">
        <Typography variant="body" truncate className="text-[var(--fe-text-primary)]">{storage?.storage}</Typography>
    </div>
));



const ActionsRenderer = memo(({ storage }: { storage: TStorage }) => {
    const { openModal, openCanvas } = useStorageStore();
    const { onRemoveStorage: { mutateAsync: onRemove } } = useStoragesFeatures();
    const confirm = useConfirm();
    const { setSelectedKeys } = useStorageStore();

    const handleRemove = async () => {
        const ok = await confirm({
            title: "Remove storage",
            message: "This action cannot be undone.",
            confirmText: "Remove",
        });

        if (ok) {
            confirm.setLoading(true);
            await onRemove({ storage_ids: [storage?.storage_id] });
            confirm.setLoading(false);
            addToast({
                title: "Storage removed",
                description: "Storage removed successfully",
                color: "success",
            });
            setSelectedKeys(new Set());
            confirm.close();
        }
    };

    return <div className="flex items-center justify-end gap-2">
        <Button variant="solid" color="primary" size='sm' onPress={() => openCanvas()}>Details</Button>
        <div className="flex items-center gap-2">
            <Tooltip content="Edit storage" >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={(e) => {
                    e.stopPropagation();
                    openModal(storage);
                }}>
                    <EditIcon color="gray" />
                </span>
            </Tooltip>
            <Tooltip color="danger" content="Remove storage">
                <span className="text-lg text-danger-500 cursor-pointer active:opacity-50" onClick={async (e) => {
                    e.stopPropagation();
                    handleRemove();
                }}>
                    <DeleteIcon color="red" />
                </span>
            </Tooltip>
        </div>
    </div>
})

export { NameRenderer, ActionsRenderer };