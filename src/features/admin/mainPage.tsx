import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { Navigation } from './components/navigation';
import { PageHeader } from './components/page-header';
import { Outlet, useRouterState } from '@tanstack/react-router';

export function MainPage() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  const getPageInfo = () => {
    switch (pathname) {
      case '/admin':
        return {
          title: 'Dashboard',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Dashboard' }],
        };
      case '/admin/teams':
        return {
          title: 'Capstone Teams',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Capstone Teams' }],
        };
      case '/admin/titles':
        return {
          title: 'Capstone Titles',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Capstone Titles' }],
        };
      case '/admin/submissions':
        return {
          title: 'Capstone Submissions',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Capstone Submissions' }],
        };
      case '/admin/users':
        return {
          title: 'User Management',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'User Management' }],
        };
      case '/admin/newteam':
        return {
          title: 'Create New Capstone Team',
          breadcrumbs: [{ label: 'Home', href: '/admin' }, { label: 'Create New Capstone Team' }],
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
        <PageHeader title={title} breadcrumbs={breadcrumbs} />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
