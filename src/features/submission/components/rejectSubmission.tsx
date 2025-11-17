import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';
import { useAccOrRejectSubmission } from '~/lib/api/submission';
import { toast } from 'sonner';

interface RejectSubmissionProps {
  submissionId: string;
}
export function RejectSubmission({ submissionId }: RejectSubmissionProps) {
  const [open, setOpen] = React.useState(false);
  const mutation = useAccOrRejectSubmission();

  const handleReject = () => {
    toast.promise(mutation.mutateAsync({ id: submissionId, accept: false }), {
      loading: 'Loading...',
    });
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          Reject
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="relative">
          <div className="flex items-start justify-between">
            <AlertDialogTitle className="text-xl">Confirm</AlertDialogTitle>
            <AlertDialogCancel asChild>
              <button className="absolute -top-1 right-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                <X className="text-muted-foreground h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </AlertDialogCancel>
          </div>
          <div className="flex justify-center py-6">
            <div className="border-foreground flex h-16 w-16 items-center justify-center rounded-full border-2">
              <span className="text-4xl font-bold">!</span>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-lg font-semibold">Are you sure you want to reject this submission?</h2>
            <AlertDialogDescription className="text-muted-foreground">
              Rejecting the submission will permanently delete the team data.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="flex-1 bg-black text-white hover:bg-black/90"
              onClick={handleReject}
            >
              Yes, Reject
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
