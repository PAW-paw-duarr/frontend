import { createFileRoute } from '@tanstack/react-router';
import { UsersTable } from '~/features/admin/table/users-table';

export const Route = createFileRoute('/_auth/admin/users')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Users - Admin | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return <UsersTable />;
}
