import { createFileRoute, redirect } from '@tanstack/react-router';
import { getTeamByIdQuery } from '~/lib/api/team';
import { z } from 'zod';
import { getCurrentPeriod } from '~/lib/api/config';
import { getCurrentUserQuery } from '~/lib/api/user';
import { Layout } from 'lucide-react';

export const Route = createFileRoute('/_auth/')({
  validateSearch: z.object({
    q: z.string().optional(), // query
    p: z.string().optional(), // profile
    t: z.string().optional(), // title
    s: z.string().optional(), // submission
  }),
  loader: async ({ context: { queryClient } }) => {
    const currentUser = await queryClient.ensureQueryData(getCurrentUserQuery());
    const currentPeriod = await queryClient.ensureQueryData(getCurrentPeriod());
    const currentTeam = await queryClient.ensureQueryData(getTeamByIdQuery(currentUser?.team_id ?? ''));

    const isOldPeriod = currentPeriod?.current_period != currentTeam?.period;

    if (isOldPeriod) {
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
