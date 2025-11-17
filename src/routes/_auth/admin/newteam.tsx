import { createFileRoute } from '@tanstack/react-router';
import { NewTeams } from '~/features/admin/components/new-teams';

export const Route = createFileRoute('/_auth/admin/newteam')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NewTeams />;
}
