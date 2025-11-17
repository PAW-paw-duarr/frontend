import { createFileRoute } from '@tanstack/react-router';
import { TitlesTable } from '~/features/admin/components/titles-tabel';

export const Route = createFileRoute('/_auth/admin/titles')({
  component: RouteComponent,
});

function RouteComponent() {

  return <TitlesTable />;
}
