import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { Navigation } from './components/navigation';
import { PageHeader } from './components/page-header';
import { Outlet, useRouterState } from '@tanstack/react-router';

export function MainPage() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  const user = {
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/logo.svg',
  };

  // Determine title and breadcrumbs based on pathname
  const getPageInfo = () => {
    switch (pathname) {
      case '/admin':
        return {
          title: 'Dashboard',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Dashboard' }],
        };
      case '/admin/teams':
        return {
          title: 'Tim Capstone',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Tim Capstone' }],
        };
      case '/admin/titles':
        return {
          title: 'Judul Capstone',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Judul Capstone' }],
        };
      case '/admin/submissions':
        return {
          title: 'Pengajuan Capstone',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Pengajuan Capstone' }],
        };
      case '/admin/users':
        return {
          title: 'User Management',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'User Management' }],
        };
      default:
        return {
          title: 'Dashboard',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Dashboard' }],
        };
    }
  };

  const { title, breadcrumbs } = getPageInfo();

  return (
    <SidebarProvider>
      <Navigation />

      <SidebarInset>
        <PageHeader title={title} breadcrumbs={breadcrumbs} user={user} />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
