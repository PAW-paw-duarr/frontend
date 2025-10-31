import { createFileRoute } from '@tanstack/react-router';
import { LogoutButton } from '~/features/auth/logout-button';

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LogoutButton />
    </div>
  );
}
