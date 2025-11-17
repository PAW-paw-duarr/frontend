import { createFileRoute } from '@tanstack/react-router';
import { InformationCard } from '~/features/admin/components/information-card';
import { TeamsTable } from '~/features/admin/components/teams-table';

export const Route = createFileRoute('/_auth/admin/teams')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <InformationCard />
      <TeamsTable />
    </div>
  );
}
