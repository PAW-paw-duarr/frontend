import { createFileRoute } from '@tanstack/react-router';
import { InformationCard } from '~/features/admin/components/information-card';
import { SubmissionsTable } from '~/features/admin/components/submissions-table';

export const Route = createFileRoute('/_auth/admin/submissions')({
  component: RouteComponent,
});

function RouteComponent() {
  const user = {
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/logo.svg',
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-6">
        <InformationCard />
        <SubmissionsTable />
      </div>
    </>
  );
}
