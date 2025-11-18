import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { ProfileDiri } from './profile-diri';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
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
      <DialogContent className="flex max-h-[85vh] flex-col bg-white sm:max-w-[600px]">
        <DialogHeader hidden>
          <DialogTitle className="text-xl font-semibold">Account</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" className="flex flex-1 flex-col overflow-hidden">
          <div className="flex shrink-0 justify-center">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account" className="mt-4 flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(85vh-180px)]">
              <div className="px-4 pb-4">
                <ProfileDiri />
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="team" className="mt-4 flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(85vh-180px)]">
              <div className="px-4 pb-4">
                <ProfileTim />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
