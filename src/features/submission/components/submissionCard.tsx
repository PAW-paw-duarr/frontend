import { Crown, User, FileText, ExternalLink } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { AcceptSubmission } from './accSubmission';
import { RejectSubmission } from './rejectSubmission';
import type { SubmissionCardProps } from '~/features/submission/hooks/useSubmission';

export function SubmissionCard({ submission, onAccept, onReject }: SubmissionCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-xl font-bold">{submission.title}</h3>
        <span className="text-sm text-gray-500">{submission.date}</span>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-white">
          <Crown className="h-4 w-4" />
          <span className="text-sm font-medium">
            Ketua Kelompoknya {submission.leadName}
          </span>
        </div>

        {submission.members.map(member => (
          <div
            key={member.id}
            className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2"
          >
            <User className="h-4 w-4" />
            <span className="text-sm">
              {member.role} ({member.name})
            </span>
          </div>
        ))}
      </div>

      <a
        href={submission.documentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 flex items-center gap-2 text-sm text-blue-600 hover:underline"
      >
        <FileText className="h-4 w-4" />
        <span className="flex-1 truncate">{submission.documentName}</span>
        <ExternalLink className="h-4 w-4" />
      </a>

      <div className="flex gap-2">
        <RejectSubmission
          onReject={() => onReject(submission.id)}
          trigger={
            <Button variant="outline" className="flex-1">
              Tolak
            </Button>
          }
        />
        <AcceptSubmission
          onAccept={() => onAccept(submission.id)}
          trigger={
            <Button className="flex-1 bg-black text-white hover:bg-black/90">
              Terima
            </Button>
          }
        />
      </div>
    </div>
  );
}