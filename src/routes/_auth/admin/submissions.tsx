import { createFileRoute } from '@tanstack/react-router';
import { SubmissionsTable } from '~/features/admin/table/submissions-table';

export const Route = createFileRoute('/_auth/admin/submissions')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Submissions - Admin | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return <SubmissionsTable />;
}
