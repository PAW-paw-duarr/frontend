import { FileText, ExternalLink } from 'lucide-react';
import { AcceptSubmission } from './accSubmission';
import { RejectSubmission } from './rejectSubmission';
import { useQuery } from '@tanstack/react-query';
import { getSubmissionByIdQuery } from '~/lib/api/submission';
import { getTeamByIdQuery } from '~/lib/api/team';
import { useProfileDialogStore } from '~/hooks/global';
import { useNavigate } from '@tanstack/react-router';
import { ProfileOrangS } from '~/features/profile/components/profile-dialog-orang';
import { MemberTeam } from '~/components/list/member-team';

interface SubmissionCardProps {
  submissionId: string;
}
export function SubmissionCard({ submissionId }: SubmissionCardProps) {
  const { data: submission } = useQuery(getSubmissionByIdQuery(submissionId));
  const { data: teamData } = useQuery(getTeamByIdQuery(submission?.team_id || ''));
  const navigate = useNavigate();
  const stateProfile = useProfileDialogStore((state) => state.state);
  const setStateProfile = useProfileDialogStore((state) => state.setState);

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
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-bold">{teamData?.id}</h3>
        </div>

        <div className="mb-4 space-y-2">
          <MemberTeam
            dataMember={teamData?.member || []}
            leaderEmail={teamData?.leader_email}
            toggleProfileDialog={toggleProfileDialog}
          />
        </div>

        <a
          href={submission?.grand_design_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <FileText className="h-4 w-4" />
          <span className="flex-1 truncate">{submission?.grand_design_url}</span>
          <ExternalLink className="h-4 w-4" />
        </a>

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
            <RejectSubmission submissionId={submissionId} />
            <AcceptSubmission submissionId={submissionId} />
          </div>
        )}
      </div>
    </>
  );
}
