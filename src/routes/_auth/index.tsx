import { createFileRoute } from '@tanstack/react-router';
import { LogoutButton } from '~/features/auth/logout-button';
import { CardCapstone } from '~/features/home/card-capstone';
import { CardSubmission } from '~/features/home/card-submission';
import { Footer } from '~/features/home/footer';
import { Header } from '~/features/home/header';

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <LogoutButton />
      <CardCapstone />
      <CardSubmission />
      <Footer />
    </div>
  );
}
