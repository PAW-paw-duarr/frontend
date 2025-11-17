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

interface AcceptSubmissionProps {
  submissionId: string;
}
export function AcceptSubmission({ submissionId }: AcceptSubmissionProps) {
  const [open, setOpen] = React.useState(false);
  const mutation = useAccOrRejectSubmission();

  const handleAccept = () => {
    mutation.mutate({ id: submissionId, accept: true });
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex-1 bg-black text-white hover:bg-black/90">Terima</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="relative">
          <div className="flex items-start justify-between">
            <AlertDialogTitle className="text-xl">Konfirmasi</AlertDialogTitle>
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
            <h2 className="text-lg font-semibold">Yakin Ingin Menerima Pengajuan Ini?</h2>
            <AlertDialogDescription className="text-muted-foreground">
              Menerima pengajuan akan memberikan project capstone anda kepada tim yang diterima.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="flex-1">
              Batal
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="flex-1 bg-black text-white hover:bg-black/90"
              onClick={handleAccept}
            >
              Ya, Terima
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
