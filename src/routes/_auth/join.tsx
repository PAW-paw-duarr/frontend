import { createFileRoute, redirect } from '@tanstack/react-router';
import { JoinTeam } from '~/features/auth/input-code';
import { getAllUsersQuery } from '~/lib/api/user';

export const Route = createFileRoute('/_auth/join')({
  loader: async ({ context: { user, queryClient } }) => {
    if (user?.team_id) {
      throw redirect({ to: '/' });
    }
    const testAdmin = await queryClient.fetchQuery(getAllUsersQuery());
    if (testAdmin.length > 0) {
      throw redirect({ to: '/' });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'Join Team | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <JoinTeam />
      </div>
    </div>
  );
}
