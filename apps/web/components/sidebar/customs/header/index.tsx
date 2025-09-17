"use client"
import React from 'react'
import { SidebarHeader as SidebarHeaderComponent } from '@foodify/design-system/components/sidebar';
import { Avatar } from '@foodify/design-system/components/avatar';
import { useSidebar } from '@foodify/design-system/components/sidebar/customs/hook/useSidebar';


export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[360px] p-1 rounded-small max-h-[400px] overflow-y-scroll">
        {children}
    </div>
); 
 
export const organizations = [
    {
        id: 1,
        title: "Green Valley Restaurant",
        description: "Farm-to-table dining experience with locally sourced ingredients",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Fine Dining",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
        location: "Downtown District",
    },
    {
        id: 2,
        title: "Spice Corner Bistro",
        description: "Authentic Asian fusion cuisine with modern presentation",
        address: "123 Main Street, Downtown District",
        status: "paused",
        category: "Asian Fusion",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
        location: "Cultural Quarter",
    },
];

export const SidebarHeader = () => {
    const { open } = useSidebar()
    const [selectedOrganization, setSelectedOrganization] = React.useState(organizations[0]);

    return (
        <SidebarHeaderComponent>
            <div className='flex items-center gap-2'>
                <Avatar size='sm' isBordered color='success' radius="lg" src={selectedOrganization.avatar} />
                {open && <p className='text-2xl leading-1.5 font-semibold text-white'>{selectedOrganization?.title?.slice(0, 15)}</p>}
            </div>
        </SidebarHeaderComponent>
    )
}
