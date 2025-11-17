import { createFileRoute } from '@tanstack/react-router';
import { TitlesTable } from '~/features/admin/table/titles-tabel';

export const Route = createFileRoute('/_auth/admin/titles')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Titles - Admin | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return <TitlesTable />;
}
