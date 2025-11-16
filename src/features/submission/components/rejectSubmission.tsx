import * as React from "react"
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
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { X } from "lucide-react"

interface RejectSubmissionProps {
  onReject: () => void
  trigger?: React.ReactNode
}

export function RejectSubmission({ onReject, trigger }: RejectSubmissionProps) {
  const [open, setOpen] = React.useState(false)

  const handleReject = () => {
    onReject()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || <Button variant="destructive">Tolak</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="relative">
          <div className="flex items-start justify-between">
            <AlertDialogTitle className="text-xl">Konfirmasi</AlertDialogTitle>
            <AlertDialogCancel asChild>
              <button className="absolute -top-1 right-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                <X className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Close</span>
              </button>
            </AlertDialogCancel>
          </div>
          <div className="flex justify-center py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground">
              <span className="text-4xl font-bold">!</span>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-lg font-semibold">
              Yakin Ingin Menolak Pengajuan Ini?
            </h2>
            <AlertDialogDescription className="text-muted-foreground">
              Menolak pengajuan akan menghapus data tim secara permanen.
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
              onClick={handleReject}
            >
              Ya, Tolak
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}