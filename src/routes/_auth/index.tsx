import { createFileRoute, redirect } from '@tanstack/react-router';
import { getTeamByIdQuery } from '~/lib/api/team';
import { z } from 'zod';
import { getCurrentPeriod } from '~/lib/api/config';
import { Layout } from 'lucide-react';
import { getAllUsersQuery } from '~/lib/api/user';

export const Route = createFileRoute('/_auth/')({
  validateSearch: z.object({
    q: z.string().optional(), // query
    p: z.string().optional(), // profile
    t: z.string().optional(), // title
    s: z.string().optional(), // submission
  }),
  loader: async ({ context: { queryClient, user } }) => {
    if (!user?.team_id) {
      const testAdmin = await queryClient.fetchQuery(getAllUsersQuery());
      if (testAdmin.length === 0) {
        throw redirect({ to: '/join' });
      } else {
        throw redirect({ to: '/admin' });
      }
    }
    const currentPeriod = await queryClient.ensureQueryData(getCurrentPeriod());
    const currentTeam = await queryClient.ensureQueryData(getTeamByIdQuery(user?.team_id ?? ''));

    const isOldPeriod = currentPeriod?.current_period != currentTeam?.period;

    if (isOldPeriod) {
      if (!currentTeam?.title_id && currentTeam?.leader_email === user?.email) {
        throw redirect({ to: '/title' });
      }
      throw redirect({ to: '/s' });
    } else {
      throw redirect({ to: '/t' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Layout />;
}
