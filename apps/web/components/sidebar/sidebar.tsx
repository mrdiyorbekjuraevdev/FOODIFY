"use client"
import React from 'react'
import { Sidebar as SidebarComponent, SidebarContent, SidebarMenuItem, SidebarRail, SidebarMenu, SidebarMenuButton, SidebarGroup } from '@foodify/design-system/components/sidebar';
import { SidebarHeader } from './customs/header';
import { SidebarFooter } from './customs/footer';
import { useSidebar } from '@foodify/design-system/components/sidebar/customs/hook/useSidebar';
import { SquareTerminal } from "lucide-react";
import { HomeIcon } from '@/assets/icons/sidebar/home.icon';
import { CollapseItems, TRoutes } from './customs/shared/collapsibele-item';
import { SidebarItem } from './customs/shared/menu-link';
import { usePathname } from 'next/navigation';
import { useBranchesCache } from '../../servers/base/branches';

const links: TRoutes[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <HomeIcon />,
    id: 1,
    hasChild: true,
    children: []
  },
]

export const Sidebar = () => {
  const { open } = useSidebar()
  const pathname = usePathname();
  const { branches } = useBranchesCache()
  return (
    <SidebarComponent side="left" variant="sidebar" collapsible='icon'>
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((route) => (
              <CollapseItems key={route.id} {...route} />
            ))}
            <SidebarItem title="Workers" icon={<HomeIcon />} href="/workers" isActive={pathname.includes("/workers")} />
            <SidebarItem title="Roles" icon={<HomeIcon />} href="/roles" isActive={pathname.includes("/roles")} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </SidebarComponent>
  )
}
