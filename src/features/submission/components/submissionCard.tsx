import { FileText, ExternalLink } from 'lucide-react';
import { AcceptSubmission } from './accSubmission';
import { RejectSubmission } from './rejectSubmission';
import { Button } from '~/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getSubmissionByIdQuery } from '~/lib/api/submission';
import { getTeamByIdQuery } from '~/lib/api/team';
import { useProfileDialogStore } from '~/hooks/global';
import { useNavigate } from '@tanstack/react-router';
import { ProfileOrangS } from '~/features/profile/profile-dialog-orang';
import { MemberTeam } from '~/components/list/member-team';
import { getCurrentUserQuery } from '~/lib/api/user';

interface SubmissionCardProps {
  submissionId: string;
}
export function SubmissionCard({ submissionId }: SubmissionCardProps) {
  const { data: submission } = useQuery(getSubmissionByIdQuery(submissionId));
  const { data: teamData } = useQuery(getTeamByIdQuery(submission?.team_id || ''));
  const { data: targetTeamData } = useQuery(getTeamByIdQuery(submission?.team_target_id || ''));
  const { data: currentUser } = useQuery(getCurrentUserQuery());
  const navigate = useNavigate();
  const stateProfile = useProfileDialogStore((state) => state.state);
  const setStateProfile = useProfileDialogStore((state) => state.setState);
  const isLeader = currentUser?.email === targetTeamData?.leader_email;

  function toggleProfileDialog(profileId: string) {
    navigate({
      to: '.',
      search: (old) => ({ ...old, p: profileId }),
      replace: true,
      resetScroll: false,
    });
    setStateProfile(true);
  }

  return (
    <>
      {stateProfile && <ProfileOrangS />}
      <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-bold">{submission?.id}</h3>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <MemberTeam
            dataMember={teamData?.member || []}
            leaderEmail={teamData?.leader_email}
            toggleProfileDialog={toggleProfileDialog}
            variant="compact"
          />
        </div>

        <div className="mt-auto space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2 border-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
            onClick={() => window.open(submission?.grand_design_url, '_blank')}
          >
            <FileText className="h-5 w-5" />
            View Grand Design Document
            <ExternalLink className="h-4 w-4" />
          </Button>

          {submission?.accepted === true ? (
            <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-800">
              <p className="text-sm font-medium">✓ Submission accepted</p>
            </div>
          ) : submission?.accepted === false ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800">
              <p className="text-sm font-medium">✗ Submission rejected</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <RejectSubmission submissionId={submissionId} disabled={!isLeader} />
              <AcceptSubmission submissionId={submissionId} disabled={!isLeader} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
