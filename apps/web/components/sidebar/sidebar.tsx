"use client"
import React from 'react'
import { Sidebar as SidebarComponent, SidebarContent, SidebarRail, SidebarMenu, SidebarGroup } from '@foodify/design-system/components/sidebar';
import { SidebarHeader } from './customs/header';
import { HomeIcon } from '@/assets/icons/sidebar/home.icon';
import { CollapseItems } from './customs/shared/collapsibele-item';
import { SidebarItem } from './customs/shared/menu-link';
import { usePathname } from 'next/navigation';
import { useSidebarFeatures } from './features';

export const Sidebar = () => {
  const pathname = usePathname();
  const links = useSidebarFeatures()
  return (
    <SidebarComponent side="left" variant="sidebar" collapsible='icon'>
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.routes.map((route) => (
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
