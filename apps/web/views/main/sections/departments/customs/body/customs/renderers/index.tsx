"use client"
import { Tooltip } from "@foodify/design-system/components/tooltip";
import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { memo } from "react";
import { EditIcon } from "@/assets/icons/edit.icon";

import { useConfirm } from "@/components/confirm-actions";
import { addToast } from "@foodify/design-system/components/toast";
import { Typography } from "@foodify/design-system/components/typography";
import { useDepartmentStore } from "@/stores/main/departments";
import { TDepartment } from "@/types/main/departments";
import { useDepartmentsFeatures } from "../../../../features";

const NameRenderer = memo(({ department }: { department: TDepartment }) => (
    <div className="gap-2 grid">
        <Typography variant="body" truncate className="text-[var(--fe-text-primary)]">{department?.department}</Typography>
    </div>
));



const ActionsRenderer = memo(({ department }: { department: TDepartment }) => {
    const { openModal } = useDepartmentStore();
    const { onRemoveDepartment: { mutateAsync: onRemove } } = useDepartmentsFeatures();
    const confirm = useConfirm();
    const { setSelectedKeys } = useDepartmentStore();

    const handleRemove = async () => {
        const ok = await confirm({
            title: "Remove category",
            message: "This action cannot be undone.",
            confirmText: "Remove",
        });

        if (ok) {
            confirm.setLoading(true);
            await onRemove({ department_ids: [department?.department_id] });
            confirm.setLoading(false);
            addToast({
                title: "Department removed",
                description: "Department removed successfully",
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
                    openModal(department);
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