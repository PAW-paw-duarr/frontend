import { createFileRoute } from '@tanstack/react-router';
import { MainPage } from '~/features/admin/mainPage';

export const Route = createFileRoute('/_auth/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainPage />;
}
