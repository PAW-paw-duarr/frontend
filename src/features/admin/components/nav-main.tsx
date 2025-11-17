'use client';

import { ChevronRight, type LucideIcon, LogOut } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '~/lib/utils';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import { useLogout } from '~/lib/api/auth';
import { Button } from '~/components/ui/button';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const location = useLocation();
  const muatation = useLogout();

  return (
    <SidebarGroup className="flex h-full flex-col">
      <SidebarMenu className="flex-1">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                <Link
                  to={item.url}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5 shrink-0" />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
      <SidebarMenu className="mt-auto">
        <SidebarMenuItem>
          <Button onClick={() => muatation.mutate()} variant={"destructive"} className='w-full mb-5'>
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Logout</span>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
