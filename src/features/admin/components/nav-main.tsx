'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '~/lib/utils';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';

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

  return (
    <SidebarGroup>
      <SidebarMenu>
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
    </SidebarGroup>
  );
}
