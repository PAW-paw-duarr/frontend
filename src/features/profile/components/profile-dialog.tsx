import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { ProfileDiri } from './profile-diri';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { LogoutButton } from '~/features/auth/logout-button';
import { ProfileTim } from './profile-tim';
import { ScrollArea } from '~/components/ui/scroll-area';
import { useNavigate } from '@tanstack/react-router';
import { useMyProfileDialogStore } from '~/hooks/global';

export function DialogProfile() {
  const navigate = useNavigate();
  const stateMyProfile = useMyProfileDialogStore((state) => state.state);
  const setStateMyProfile = useMyProfileDialogStore((state) => state.setState);

  function onClose() {
    navigate({ to: '.', search: (old) => ({ ...old, p: undefined }), resetScroll: false });
    setStateMyProfile(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={stateMyProfile} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto bg-white sm:max-w-[600px]">
        <DialogHeader hidden>
          <DialogTitle className="text-xl font-semibold">Account</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account">
            <ScrollArea className="h-[500px] rounded-md border p-4">
              <ProfileDiri />
            </ScrollArea>
            <div className="mt-4 flex justify-end border-t border-gray-200 pt-4">
              <LogoutButton />
            </div>
          </TabsContent>
          <TabsContent value="team">
            <ScrollArea className="h-[500px] rounded-md border p-4">
              <ProfileTim />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
