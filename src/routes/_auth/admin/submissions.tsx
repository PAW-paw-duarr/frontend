import { createFileRoute } from '@tanstack/react-router';
import { SubmissionsTable } from '~/features/admin/components/submissions-table';

export const Route = createFileRoute('/_auth/admin/submissions')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SubmissionsTable />;
}
