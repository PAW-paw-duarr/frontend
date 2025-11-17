import { createFileRoute } from '@tanstack/react-router';
import { InformationCard } from '~/features/admin/components/information-card';
import { TitlesTable } from '~/features/admin/components/titles-tabel';

export const Route = createFileRoute('/_auth/admin/titles')({
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
        <TitlesTable />
      </div>
    </>
  );
}
