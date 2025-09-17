"use client"
import React, { memo } from "react";
import Link from "next/link";
import { cn } from "@foodify/design-system/lib/utils";
import { useSidebar } from "@foodify/design-system/components/sidebar/customs/hook/useSidebar";
import { Tooltip } from "@foodify/design-system/components/tooltip";

interface Props {
    title: string;
    icon: React.ReactNode;
    isActive?: boolean;
    href?: string;
    isExpanded?: boolean;
}

export const SidebarItem = memo(
    ({ icon, title, isActive, href = "", isExpanded }: Props) => {
        const { open } = useSidebar()
        return (
            <Tooltip content={title} placement="right" radius="sm">
                <Link
                    href={href}
                    className="text-default-900 active:bg-none max-w-full "
                >
                    <div
                        className={cn(
                            isActive ? "bg-[#60D43114] active-icon" : "hover:bg-[#60D43114]",
                            `flex gap-2 w-full min-h-[44px] h-full items-center px-3.5  cursor-pointer transition-all duration-150 active:scale-[0.98] `,
                            !open && "flex-col justify-center"
                        )}
                    >
                        {icon}
                        {open && <span className={`text-white text-lg`}>{title}</span>}
                    </div>
                </Link>
            </Tooltip>
        );
    },
);
