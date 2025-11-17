import { useLocation } from '@tanstack/react-router';
import { Separator } from '~/components/ui/separator';
import { SidebarTrigger } from '~/components/ui/sidebar';

function getPageTitle(pathname: string): string {
  switch (pathname) {
    case '/admin':
      return 'Dashboard';
    case '/admin/users':
      return 'User Management';
    case '/admin/teams':
      return 'Team Management';
    case '/admin/projects':
      return 'Project Management';
    case '/admin/settings':
      return 'Settings';
    case '/admin/newteam':
      return 'New Capstone Team';
    default:
      return (
        pathname
          .split('/')
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Admin'
      );
  }
}

export function SiteHeader() {
  const location = useLocation();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{getPageTitle(location.pathname)}</h1>
        <div className="ml-auto flex items-center gap-2"></div>
      </div>
    </header>
  );
}
