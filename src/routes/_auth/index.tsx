import { createFileRoute, redirect } from '@tanstack/react-router';
import { Navigation } from '~/features/home/components/navigation';
import { Footer } from '~/features/home/components/footer';
import { Header } from '~/features/home/components/header';
import { Title } from '~/features/home/components/title';
import { getTeamByIdQuery } from '~/lib/api/team';
import { getTitleByIdQuery } from '~/lib/api/title';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/')({
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  loader: async ({ context: { queryClient }, location: { hash } }) => {
    if (!hash.startsWith('#title/')) {
      return;
    }
    const titleId = hash.replace('#title/', '');

    if (!titleId || titleId.trim() === '') {
      return redirect({ to: '.', hash: '' });
    }

    try {
      const titleData = await queryClient.ensureQueryData(getTitleByIdQuery(titleId));
      if (!titleData) {
        return redirect({ to: '.', hash: '' });
      }
      await queryClient.ensureQueryData(getTeamByIdQuery(titleData.team_id ?? ''));
    } catch {
      return redirect({ to: '.', hash: '' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navigation />
      <Header />
      <Title />
      <Footer />
    </>
  );
}
