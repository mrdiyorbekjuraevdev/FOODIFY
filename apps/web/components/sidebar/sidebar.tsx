"use client"
import React from 'react'
import { Sidebar as SidebarComponent, SidebarContent, SidebarMenuItem, SidebarRail, SidebarMenu, SidebarMenuButton } from '@foodify/design-system/components/sidebar';
import { SidebarHeader } from './customs/header';
import { SidebarFooter } from './customs/footer';
import { useSidebar } from '@foodify/design-system/components/sidebar/customs/hook/useSidebar';

export const Sidebar = () => {
  const { open } = useSidebar()
  return (
    <SidebarComponent side="left" variant="sidebar" collapsible='icon'>
      <SidebarHeader />

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='md'>
              Branches
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      {open && <SidebarFooter />}
    </SidebarComponent>
  )
}
