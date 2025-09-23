"use client"
import { Tooltip } from "@foodify/design-system/components/tooltip";
import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { memo } from "react";
import { EditIcon } from "@/assets/icons/edit.icon";

import { useConfirm } from "@/components/confirm-actions";
import { addToast } from "@foodify/design-system/components/toast";
import { Typography } from "@foodify/design-system/components/typography";
import { useStorageStore } from "@/stores/main/storages";
import { useCategoriesFeatures, } from "../../../../features";
import { TCategory } from "@/types/main/categories";

const NameRenderer = memo(({ category }: { category: TCategory }) => (
    <div className="gap-2 grid">
        <Typography variant="body" truncate className="text-[var(--fe-text-primary)]">{category?.category}</Typography>
    </div>
));



const ActionsRenderer = memo(({ category }: { category: TCategory }) => {
    const { openModal } = useStorageStore();
    const { onRemoveCategory: { mutateAsync: onRemove } } = useCategoriesFeatures();
    const confirm = useConfirm();
    const { setSelectedKeys } = useStorageStore();

    const handleRemove = async () => {
        const ok = await confirm({
            title: "Remove category",
            message: "This action cannot be undone.",
            confirmText: "Remove",
        });

        if (ok) {
            confirm.setLoading(true);
            await onRemove({ categories_ids: [category?.category_id] });
            confirm.setLoading(false);
            addToast({
                title: "Category removed",
                description: "Category removed successfully",
                color: "success",
            });
            setSelectedKeys(new Set());
            confirm.close();
        }
    };

    return <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
            <Tooltip content="Edit storage" >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={(e) => {
                    e.stopPropagation();
                    openModal(category);
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