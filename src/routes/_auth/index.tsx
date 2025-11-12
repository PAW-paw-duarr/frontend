import { createFileRoute } from '@tanstack/react-router';
import { LogoutButton } from '~/features/auth/logout-button';
import { CardCapstone } from '~/features/home/card-capstone';

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LogoutButton />
      <CardCapstone />
    </div>
  );
}
