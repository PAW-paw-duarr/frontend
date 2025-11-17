import { createFileRoute, redirect } from '@tanstack/react-router';
import { NavigationT } from '~/components/layout/navigation';
import { Footer } from '~/components/layout/footer';
import { Header } from '~/components/layout/header';
import { Title } from '~/features/title/components/title';
import { getTeamByIdQuery } from '~/lib/api/team';
import { getTitleByIdQuery } from '~/lib/api/title';
import { z } from 'zod';
import { getCurrentPeriod } from '~/lib/api/config';

export const Route = createFileRoute('/_auth/t')({
  validateSearch: z.object({
    q: z.string().optional(),
    p: z.string().optional(),
    t: z.string().optional(),
    s: z.string().optional(),
  }),
  loader: async ({ context: { queryClient }, location: { hash } }) => {
    if (!hash.startsWith('#title/')) {
      return;
    }
    const titleId = hash.replace('#title/', '');

    if (!titleId || titleId.trim() === '') {
      throw redirect({ to: '.', hash: '' });
    }

    const titleData = await queryClient.ensureQueryData(getTitleByIdQuery(titleId));
    if (!titleData) {
      throw redirect({ to: '.', hash: '' });
    }
    await queryClient.ensureQueryData(getTeamByIdQuery(titleData.team_id ?? ''));
    await queryClient.ensureQueryData(getCurrentPeriod());
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Title | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <NavigationT />
      <Header />
      <Title />
      <Footer />
    </>
  );
}
