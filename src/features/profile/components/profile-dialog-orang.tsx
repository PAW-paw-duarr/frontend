import { Input } from '~/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getUserByIdQuery } from '~/lib/api/user';
import { Field, FieldLabel } from '~/components/ui/field';
import { FileText, ExternalLink } from 'lucide-react';
import { useProfileDialogStore } from '~/hooks/global';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { useNavigate, useSearch } from '@tanstack/react-router';

export function ProfileOrang() {
  const stateProfile = useProfileDialogStore((state) => state.state);
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/' });
  const profileId = searchParams?.p || '';

  const { data: accountData, isLoading } = useQuery(getUserByIdQuery(profileId));
  const setStateProfile = useProfileDialogStore((state) => state.setState);

  function onClose() {
    setStateProfile(false);
    navigate({ to: '.', search: (old) => ({ ...old, p: undefined }), resetScroll: false });
  }
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={stateProfile} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-white sm:max-w-[400px] z-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Account</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" value={accountData?.email} readOnly />
              </Field>

              <Field>
                <FieldLabel htmlFor="Name">Name</FieldLabel>
                <Input id="Name" value={accountData?.name} readOnly />
              </Field>

              {accountData?.cv_url && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">Current CV uploaded</p>
                    <a
                      href={accountData.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 hover:underline"
                    >
                      View current CV <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
