import { createFileRoute } from '@tanstack/react-router';
import { Header } from '~/components/layout/header';
import { NavigationS } from '~/components/layout/navigation';
import { Footer } from '~/components/layout/footer';
import { SubmissionSection } from '~/features/submission/components/submissionSection';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/s')({
  validateSearch: z.object({
    q: z.string().optional(),
    p: z.string().optional(),
    t: z.string().optional(),
    s: z.string().optional(),
  }),
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Submission | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <NavigationS />

      <main className="flex-1 bg-gray-50">
        <SubmissionSection />
      </main>

      <Footer />
    </div>
  );
}
