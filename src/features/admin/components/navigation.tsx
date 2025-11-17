'use client';

import * as React from 'react';
import { Users, BookOpen, FileText, Users2, User, UserPlus } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '~/components/ui/sidebar';
import { NavMain } from './nav-main';
import { TeamSwitcher } from './team-switcher';

const data = {
  user: {
    name: 'Admin1',
    email: 'mimin@gmail.ugm.ac.id',
    avatar: '/logo.svg',
  },
  teams: [
    {
      name: 'ReCapstone',
      logo: () => (
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-black">
          <img src="/logo.svg" alt="ReCapstone" className="h-4 w-4 invert" />
        </div>
      ),
      plan: 'Admin Dashboard',
    },
  ],
  navMain: [
    {
      title: 'Capstone Teams',
      url: '/admin/teams',
      icon: Users,
      isActive: false,
    },
    {
      title: 'New Capstone Teams',
      url: '/admin/newteam',
      icon: UserPlus,
      isActive: false,
    },
    {
      title: 'Capstone Titles',
      url: '/admin/titles',
      icon: BookOpen,
      isActive: false,
    },
    {
      title: 'Capstone Submissions',
      url: '/admin/submissions',
      icon: FileText,
      isActive: false,
    },
    {
      title: 'User Management',
      url: '/admin/users',
      icon: Users2,
      isActive: false,
    },
    {
      title: 'My Account',
      url: '/admin/myaccount',
      icon: User,
      isActive: false,
    },
  ],
};

export function Navigation({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
