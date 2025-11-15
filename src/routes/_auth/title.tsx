import { createFileRoute } from '@tanstack/react-router';
import { MainPage } from '~/features/home/mainPage';

export const Route = createFileRoute('/_auth/title')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <MainPage />
    </>
  );
}
