import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '~/features/auth/signup-form';
import { redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/signup')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.user) {
      throw redirect({ to: search.redirect || '/' });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'SignUp | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
