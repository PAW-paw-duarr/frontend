import { createFileRoute, redirect } from '@tanstack/react-router';
import { MainPage } from '~/features/admin/mainPage';
import { getAllUsersQuery } from '~/lib/api/user';

export const Route = createFileRoute('/_auth/admin')({
  loader: async ({ context: { queryClient } }) => {
    const testAdmin = await queryClient.fetchQuery(getAllUsersQuery());
    if (testAdmin.length === 0) {
      throw redirect({ to: '/' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <MainPage />;
}
