import { createFileRoute } from '@tanstack/react-router';
import { TeamsTable } from '~/features/admin/components/teams-table';

export const Route = createFileRoute('/_auth/admin/teams')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Teams - Admin | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return <TeamsTable />;
}
