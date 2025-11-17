import { createFileRoute } from '@tanstack/react-router';
import { NewTeams } from '~/features/admin/components/new-teams';

export const Route = createFileRoute('/_auth/admin/newteam')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'New Team - Admin | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return <NewTeams />;
}
