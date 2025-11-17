import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignupTitleForm } from '~/features/auth/signup-title-form';
import { getTeamByIdQuery } from '~/lib/api/team';

export const Route = createFileRoute('/_auth/title')({
  loader: async ({ context: { queryClient, user } }) => {
    if (!user?.team_id) {
      throw redirect({ to: '/' });
    }

    const teamData = await queryClient.fetchQuery(getTeamByIdQuery(user.team_id));

    if (!teamData || teamData.leader_email !== user.email || teamData.title_id) {
      throw redirect({ to: '/' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl">
        <SignupTitleForm />
      </div>
    </div>
  );
}
