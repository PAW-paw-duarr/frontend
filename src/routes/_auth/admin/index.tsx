import { createFileRoute } from '@tanstack/react-router';
import { InformationCard } from '~/features/admin/components/information-card';

export const Route = createFileRoute('/_auth/admin/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <InformationCard />
    </div>
  );
}
