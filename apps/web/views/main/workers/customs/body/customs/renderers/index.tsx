"use client"
import { TUser } from "@/types/base";
import { EyeClosed } from "lucide-react";
import { Tooltip } from "@foodify/design-system/components/tooltip";
import { Button } from "@foodify/design-system/components/button";
import { EyeIcon } from "@/assets/icons/signin.icons";
import { DeleteIcon } from "@/assets/icons/global/gloval.icons";
import { memo, useState } from "react";
import { formatDate } from "@foodify/design-system/utilities";
import { EditIcon } from "@/assets/icons/edit.icon";
import { useUserMeCache } from "@/servers/base/user";
import { useRouter } from "next/navigation";
import { Avatar } from "@foodify/design-system/components/avatar";
import { useConfirm } from "@/components/confirm-actions";
import { addToast } from "@foodify/design-system/components/toast";
import { useWorkersFeatures } from "@/views/main/workers/features";
import { useWorkersStore } from "@/stores/main/workers";
import { Protect } from "@/components/protect";

const NameRenderer = memo(({ user }: { user: TUser }) => (
    <div className="flex items-center gap-2">
        <Avatar className="size-6" showFallback src="https://images.unsplash.com/broken" />
        <p className="text-[var(--fe-text-primary)]">{user?.fullname}</p>
    </div>
));

const EmailRenderer = memo(({ user }: { user: Pick<TUser, "email"> }) => {
    return <p className="text-[var(--fe-text-primary)]">{user?.email}</p>
})

const PhoneRenderer = memo(({ user }: { user: TUser }) => {
    return <p className="text-[var(--fe-text-primary)]">{user.phone}</p>
})

const RoleRenderer = memo(({ user }: { user: TUser }) => {
    return <p className="text-[var(--fe-text-primary)]">{user?.role}</p>
})

const JoinedAtRenderer = memo(({ user }: { user: TUser }) => {
    return <p className="text-[var(--fe-text-primary)]">{formatDate(user?.joined_at || "", "en")}</p>
})

const PasswordRenderer = memo(({ user }: { user: TUser }) => {
    const [showPassword, setShowPassword] = useState(false);
    return <div className="flex items-center gap-2">
        <div>
            <p className="text-[var(--fe-text-primary)]">{showPassword ? user?.password : "********"}</p>
        </div>
        <div>
            <Button
                size="sm"
                variant="light"
                isIconOnly
                onPress={() => setShowPassword(!showPassword)}
                className="text-[var(--fe-text-primary)]"
            >
                {showPassword ? <EyeClosed className='text-zinc-500' /> : <EyeIcon className='text-zinc-500' />}
            </Button>
        </div>
    </div>
})

const ActionsRenderer = memo(({ user }: { user: TUser }) => {
    const { onRemoveWorker: { mutateAsync: onRemove } } = useWorkersFeatures();
    const confirm = useConfirm();
    const router = useRouter()
    const { user: { data: data } } = useUserMeCache();
    const { clearSelection } = useWorkersStore();

    const disabled = data?.user?.user_id === user?.user_id;

    const handleRemove = async () => {
        const ok = await confirm({
            title: "Remove worker",
            message: "This action cannot be undone.",
            confirmText: "Remove",
        });

        if (ok) {
            confirm.setLoading(true);
            await onRemove({ user_ids: [user?.user_id] });
            confirm.setLoading(false);
            clearSelection();
            confirm.close();
        }
    };

    return <div className="flex items-center justify-center">
        <div className="flex items-center gap-2">
            <Protect resource='User' actions={['read']}>
                <Tooltip content="Details" >
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/workers/${user?.user_id}`)
                    }}>
                        <EyeIcon />
                    </span>
                </Tooltip>
            </Protect>
            <Protect resource='User' actions={['update']}>
                <Tooltip content="Edit user" >
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/workers/${user?.user_id}`)
                    }}>
                        <EditIcon color="gray" />
                    </span>
                </Tooltip>
            </Protect>
            {!disabled && <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger-500 cursor-pointer active:opacity-50" onClick={async (e) => {
                    e.stopPropagation();
                    handleRemove();
                }}>
                    <DeleteIcon color="red" />
                </span>
            </Tooltip>}
        </div>
    </div>
})

export { NameRenderer, EmailRenderer, PhoneRenderer, RoleRenderer, JoinedAtRenderer, PasswordRenderer, ActionsRenderer };