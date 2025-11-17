import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from '~/features/admin/component/app-sidebar';
import { SiteHeader } from '~/features/admin/component/site-header';
import { getAllUsersQuery } from '~/lib/api/user';

export const Route = createFileRoute('/_auth/admin')({
  loader: async ({ context: { queryClient } }) => {
    const testAdmin = await queryClient.fetchQuery(getAllUsersQuery());
    if (testAdmin.length === 0) {
      throw redirect({ to: '/' });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Home - Admin | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
