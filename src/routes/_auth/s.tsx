import { createFileRoute } from '@tanstack/react-router';
import { Header } from '~/features/home/components/header';
import { NavigationS } from '~/features/home/components/navigation';
import { Footer } from '~/features/home/components/footer';
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
