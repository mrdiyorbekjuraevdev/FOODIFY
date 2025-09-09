"use client"
import React from 'react'
import { SidebarFooter as SidebarFooterComponent, SidebarGroupLabel, SidebarHeader as SidebarHeaderComponent } from '@foodify/design-system/components/sidebar';
import { Popover, PopoverContent, PopoverTrigger } from '@foodify/design-system/components/popover';
import { Avatar } from '@foodify/design-system/components/avatar';
import { useSidebar } from '@foodify/design-system/components/sidebar/customs/hook/useSidebar';
import { Listbox, ListboxItem } from '@foodify/design-system/components/listbox';
import { Divider } from '@foodify/design-system/components/divider';
import { Button } from '@foodify/design-system/components/button';
import { Plus } from 'lucide-react';
import { MovingLabel } from '@foodify/design-system/components/moving-label';

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
    {
        id: 3,
        title: "Ocean Breeze Seafood",
        description: "Fresh seafood restaurant specializing in coastal cuisine",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Seafood",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
        location: "Harbor District",
    },
    {
        id: 4,
        title: "Mountain View Cafe",
        description: "Cozy coffee shop with artisanal pastries and scenic views",
        address: "123 Main Street, Downtown District",
        status: "vacation",
        category: "Cafe",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
        location: "Hillside Area",
    },
    {
        id: 5,
        title: "Urban Kitchen",
        description: "Contemporary restaurant featuring innovative street food",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Street Food",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
        location: "City Center",
    },
    {
        id: 6,
        title: "Golden Harvest Bakery",
        description: "Traditional bakery offering fresh bread and artisan pastries",
        category: "Bakery",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
        location: "Old Town",
        status: "active",
    },
    {
        id: 7,
        title: "Sunset Grill House",
        description: "Premium steakhouse with extensive wine selection",
        address: "123 Main Street, Downtown District",
        status: "paused",
        category: "Steakhouse",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
        location: "Business District",
    },
    {
        id: 8,
        title: "Garden Fresh Salads",
        description: "Health-focused restaurant specializing in organic salads and bowls",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Health Food",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
        location: "Wellness Center",
    },
    {
        id: 9,
        title: "Mama's Italian Kitchen",
        description: "Family-owned Italian restaurant with traditional recipes",
        address: "123 Main Street, Downtown District",
        status: "vacation",
        category: "Italian",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
        location: "Little Italy",
    },
    {
        id: 10,
        title: "Taco Fiesta Express",
        description: "Fast-casual Mexican restaurant with authentic flavors",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Mexican",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
        location: "Food Court",
    },
    {
        id: 11,
        title: "Burger Paradise",
        description: "Gourmet burger joint with craft beer selection",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Burgers",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
        location: "Entertainment Zone",
    },
    {
        id: 12,
        title: "Sweet Dreams Desserts",
        description: "Specialty dessert shop featuring handcrafted sweets",
        address: "123 Main Street, Downtown District",
        status: "paused",
        category: "Desserts",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
        location: "Shopping Mall",
    },
    {
        id: 13,
        title: "Phoenix BBQ Pit",
        description: "Authentic barbecue restaurant with slow-smoked meats",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "BBQ",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
        location: "Riverside",
    },
    {
        id: 14,
        title: "Zen Garden Sushi",
        description: "Premium sushi bar with traditional Japanese atmosphere",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Japanese",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
        location: "Japan Town",
    },
    {
        id: 15,
        title: "Craft Beer & Bites",
        description: "Gastropub featuring local craft beers and elevated pub food",
        address: "123 Main Street, Downtown District",
        status: "paused",
        category: "Gastropub",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
        location: "Brewery District",
    },
    {
        id: 16,
        title: "Mediterranean Oasis",
        description: "Authentic Mediterranean cuisine with fresh ingredients",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Mediterranean",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
        location: "Historic Quarter",
    },
    {
        id: 17,
        title: "Breakfast Club Diner",
        description: "Classic American diner serving all-day breakfast favorites",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Diner",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
        location: "Main Street",
    },
    {
        id: 18,
        title: "Smoothie Station",
        description: "Fresh juice bar and smoothie shop with superfood options",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Juice Bar",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
        location: "Fitness Center",
    },
    {
        id: 19,
        title: "Royal Thai Palace",
        description: "Elegant Thai restaurant with traditional and modern dishes",
        address: "123 Main Street, Downtown District",
        status: "paused",
        category: "Thai",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
        location: "Asia District",
    },
    {
        id: 20,
        title: "Artisan Pizza Co.",
        description: "Wood-fired pizza restaurant with locally sourced toppings",
        address: "123 Main Street, Downtown District",
        status: "active",
        category: "Pizza",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
        location: "Arts Quarter",
    },
];

export const SidebarFooter = () => {
    const { open } = useSidebar()
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
    const [selectedOrganization, setSelectedOrganization] = React.useState(organizations[0]);

    return (
        <SidebarFooterComponent>
            <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger className='cursor-pointer rounded-sm'>
                    <MovingLabel containerClassName='h-15'>
                        <div className='flex items-center gap-2 p-2 rounded-md'>
                            <Avatar size='sm' isBordered color='success' radius="lg" src={selectedOrganization.avatar} />
                            <div className="flex flex-col gap-3">
                                {open && <p className='text-lg leading-1.5 font-semibold text-white text-start'>{selectedOrganization?.title?.slice(0, 15)}</p>}
                                {open && <p className='text-xs leading-1.5 font-semibold text-zinc-500'>{selectedOrganization?.address?.slice(0, 25)}</p>}
                            </div>
                        </div>
                    </MovingLabel>
                </PopoverTrigger>
                <PopoverContent className='w-[360px] overflow-hidden pb-0'>
                    <div className="px-1">
                        <p className="text-small font-semibold px-4 py-2">Branches</p>
                        <Divider />
                        <ListboxWrapper>
                            <Listbox
                                disallowEmptySelection
                                aria-label="Single selection example"
                                selectedKeys={selectedKeys}
                                selectionMode="single"
                                variant="flat"
                                onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
                            >
                                {organizations.map((organization) => (
                                    <ListboxItem key={organization.id} onClick={() => setSelectedOrganization(organization)}>
                                        <div className="flex gap-2 items-center">
                                            <Avatar alt={organization.title} className="shrink-0" size="sm" src={organization.avatar} />
                                            <div className="flex flex-col">
                                                <span className="text-small">{organization.title}</span>
                                                <span className="text-tiny text-default-400">{organization.address}</span>
                                            </div>
                                        </div>
                                    </ListboxItem>
                                ))}
                            </Listbox>
                        </ListboxWrapper>
                        <Divider />
                        <div className="flex items-center gap-2 overflow-hidden">
                            <Button variant="light" startContent={<Avatar size='sm' fallback={<Plus size={16} strokeWidth={1.5} />} />} className='w-full rounded-none text-md '>Create New Branch</Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </SidebarFooterComponent>

    )
}
