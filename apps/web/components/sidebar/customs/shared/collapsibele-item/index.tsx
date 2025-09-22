import { ChevronDownIcon } from "@/assets/icons/sidebar/chevrow-down.icon";
import { CopyDocumentIcon } from "@/assets/icons/sidebar/copy-document.icon";
import { Accordion, AccordionItem } from "@foodify/design-system/components/accordion";
import { Button } from "@foodify/design-system/components/button";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@foodify/design-system/components/dropdown";
import { memo } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSidebar } from "@foodify/design-system/components/sidebar/customs/hook/useSidebar";
import { cn } from "@foodify/design-system/lib/utils";
import { TRoutes } from "../../../../../types/base";



export const CollapseItems = memo(
    ({ icon, title, children, path }: TRoutes) => {
        const { open } = useSidebar()
        const pathname = usePathname();
        const router = useRouter();
        const iconClasses =
            "text-xl text-default-500 pointer-events-none flex-shrink-0";

        const isActive = pathname.includes(path!);
        return (
            <div className="flex gap-4 h-full items-center cursor-pointer">
                {!open ? (
                    <Dropdown placement="right-start">
                        <DropdownTrigger className="hover:bg-[#60D43114]">
                            <div
                                className={cn(
                                    `w-full flex items-center gap-2 px-4 py-2 text-lg  rounded-none ${pathname.startsWith(path!) && "active-icon"}`,
                                    iconClasses,
                                    !open && "flex-col justify-center"
                                )}
                            >
                                {icon}
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dropdown menu with icons">
                            {children!.map((item, index) => (
                                <DropdownItem
                                    key={index}
                                    startContent={<CopyDocumentIcon className={iconClasses} />}
                                    onClick={() => router.push(`${path}`)}
                                    className="text-white"
                                >
                                    {item?.title}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown >
                ) : (
                    <Accordion className="px-0 rounded-none">
                        <AccordionItem
                            indicator={<ChevronDownIcon />}
                            classNames={{
                                indicator: "data-[open=true]:-rotate-180",
                                trigger:
                                    cn("py-0 min-h-[44px] hover:bg-[#60D43114]  active:scale-[0.98] transition-transform px-3.5", isActive && "bg-[#60D43114] text-[#60D431]"),

                                title:
                                    "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
                            }}
                            aria-label="Accordion 1"
                            title={
                                <div className="flex flex-row items-center gap-2">
                                    <span className={cn(isActive && "active-icon")}>{icon}</span>
                                    {<span className="text-lg text-white">{title}</span>}
                                </div>
                            }
                        >
                            <div className="pl-4 pr-2 relative space-y-2">
                                {children!.map((item, index) => (
                                    <div key={index} className={cn(`w-full flex items-center gap-2 p-2 rounded-lg  text-default-500 transition-colors hover:bg-[#60D43114] hover:text-[#60D431]`, pathname.includes(item?.path!) && "bg-[#60D43114] text-white")}>
                                        <span>{item?.icon}</span>
                                        <span
                                            key={index}

                                            onClick={() => {
                                                router.push(`${path}${item?.path}`)
                                            }}
                                        >
                                            {item?.title}
                                        </span>
                                    </div>
                                ))}
                                <span className="absolute bottom-0 w-[4px] h-fit bg-red-100 left-0" />
                            </div>
                        </AccordionItem>
                    </Accordion>
                )
                }
            </div >
        );
    },
);
