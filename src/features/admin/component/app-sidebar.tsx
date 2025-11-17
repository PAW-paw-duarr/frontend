import { NavMain } from '~/features/admin/component/nav-main';
import { NavUser } from '~/features/admin/component/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';
import { useNavigate } from '@tanstack/react-router';
import { BookOpen, FileText, LucideLayoutDashboard, Users, Users2 } from 'lucide-react';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: LucideLayoutDashboard,
    },
    {
      title: 'Teams',
      url: '/admin/teams',
      icon: Users,
    },
    {
      title: 'New Team',
      url: '/admin/newteam',
      icon: Users,
    },
    {
      title: 'Titles',
      url: '/admin/titles',
      icon: BookOpen,
    },
    {
      title: 'Submissions',
      url: '/admin/submissions',
      icon: FileText,
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: Users2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <button type="button" onClick={() => navigate({ to: '/admin' })}>
                <div className="flex items-center justify-center rounded-lg">
                  <img src="/logo.svg" alt="ReCapstone" className="size-5" />
                </div>
                <span className="text-base font-semibold">ReCapstone</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
