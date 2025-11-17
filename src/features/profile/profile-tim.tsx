import { Button } from '~/components/ui/button';
import { FileText, X, ExternalLink, Users, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { getTeamByIdQuery, useKickMember } from '~/lib/api/team';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';
import { getAllSubmissionQuery, getSubmissionByIdQuery, useDeleteSubmission } from '~/lib/api/submission';
import { Input } from '~/components/ui/input';
import { Field, FieldLabel } from '~/components/ui/field';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Badge } from '~/components/ui/badge';
import { toast } from 'sonner';

export function ProfileTim() {
  const { data: accountData } = useQuery(getCurrentUserQuery());
  const { data: teamData } = useQuery(getTeamByIdQuery(accountData?.team_id || ''));
  const { data: submissions } = useQuery(getAllSubmissionQuery());
  const isCaptain = teamData?.leader_email === accountData?.email;
  const mutation = useKickMember(teamData?.id || '');

  const handleKickMember = (memberId: string) => {
    toast.promise(mutation.mutateAsync(memberId), {
      loading: 'Loading...',
    });
  };

  if (!accountData?.team_id) {
    return <div className="text-center text-gray-500">You are not part of any team.</div>;
  }

  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel htmlFor="team-name">Team Name</FieldLabel>
        <Input id="team-name" value={teamData?.name} readOnly />
      </Field>

      <Field>
        <FieldLabel htmlFor="leader-email">Team Leader</FieldLabel>
        <Input id="leader-email" value={teamData?.leader_email} readOnly />
      </Field>

      <Field>
        <FieldLabel htmlFor="category">Category</FieldLabel>
        <Input id="category" value={teamData?.category} readOnly />
      </Field>

      <Field>
        <FieldLabel htmlFor="period">Period</FieldLabel>
        <Input id="period" type="number" value={teamData?.period} readOnly />
      </Field>

      {teamData?.code && (
        <Field>
          <FieldLabel htmlFor="code">Team Code</FieldLabel>
          <Input id="code" value={teamData.code} readOnly />
        </Field>
      )}

      <Field>
        <FieldLabel>Team Members</FieldLabel>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                {isCaptain && <TableHead className="w-[100px]">Delete</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamData?.member && teamData.member.length > 0 ? (
                teamData.member.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    {isCaptain && (
                      <TableCell>
                        {member.email !== teamData.leader_email && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleKickMember(member.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isCaptain ? 3 : 2} className="text-center text-gray-500">
                    No team members yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Field>

      <Field>
        <FieldLabel>Submissions</FieldLabel>
        {submissions && submissions.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {submissions.map((submission, index) => (
              <AccordionItem key={submission.id} value={`submission-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Submission #{index + 1}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <SubmissionDetails submissionId={submission.id} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center text-gray-500">
            No submissions yet
          </div>
        )}
      </Field>
    </div>
  );
}

function SubmissionDetails({ submissionId }: { submissionId: string }) {
  const { data, isLoading } = useQuery(getSubmissionByIdQuery(submissionId));
  const { data: teamTarget } = useQuery(getTeamByIdQuery(data?.team_id || ''));
  const { data: accountData } = useQuery(getCurrentUserQuery());
  const { data: teamData } = useQuery(getTeamByIdQuery(accountData?.team_id || ''));
  const deleteSubmissionMutation = useDeleteSubmission();
  const isCaptain = teamData?.leader_email === accountData?.email;

  const handleDelete = () => {
    toast.promise(deleteSubmissionMutation.mutateAsync(submissionId), {
      loading: 'Loading...',
    });
  };

  const getStatusBadge = (accepted: boolean | undefined) => {
    if (accepted === true) {
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Accepted
        </Badge>
      );
    }
    if (accepted === false) {
      return (
        <Badge variant="destructive">
          <X className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        <Clock className="mr-1 h-3 w-3" />
        Pending
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-gray-50/50 p-4 text-center text-gray-500">Loading submission details...</div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg border bg-gray-50/50 p-4 text-center text-gray-500">No submission data found</div>
    );
  }

  return (
    <div className="space-y-4 rounded-lg border bg-gray-50/50 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Users className="h-4 w-4" />
            Team Target
          </div>
          <p className="text-sm text-gray-900">{teamTarget?.name || 'N/A'}</p>
        </div>

        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-700">Status</div>
          <div>{getStatusBadge(data?.accepted)}</div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText className="h-4 w-4" />
          Grand Design URL
        </div>
        {data?.grand_design_url ? (
          <a
            href={data.grand_design_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span className="break-all">{data.grand_design_url.replace('/file/grand_design/', '')}</span>
            <ExternalLink className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>
        ) : (
          <p className="text-sm text-gray-500">No URL provided</p>
        )}
      </div>

      {isCaptain && (
        <div className="flex justify-end border-t pt-4">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleteSubmissionMutation.isPending}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {deleteSubmissionMutation.isPending ? 'Deleting...' : 'Delete Submission'}
          </Button>
        </div>
      )}
    </div>
  );
}
