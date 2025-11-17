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
    const testAdmin = await queryClient.fetchQuery(getAllUsersQuery());
    if (!user?.team_id) {
      if (testAdmin.length === 0) {
        return redirect({ to: '/join' });
      }
    }
    const currentPeriod = await queryClient.ensureQueryData(getCurrentPeriod());
    const currentTeam = await queryClient.ensureQueryData(getTeamByIdQuery(user?.team_id ?? ''));

    const isOldPeriod = currentPeriod?.current_period != currentTeam?.period;

    if (isOldPeriod) {
      if (!currentTeam?.title_id && currentTeam?.leader_email === user?.email) {
        return redirect({ to: '/title' });
      }
      return redirect({ to: '/s' });
    } else {
      return redirect({ to: '/t' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Layout />;
}
