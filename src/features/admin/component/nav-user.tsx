import { useQuery } from '@tanstack/react-query';
import { LogOut, UserPen } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';
import { useLogout } from '~/lib/api/auth';
import { getCurrentUserQuery } from '~/lib/api/user';
import { getAlias } from '~/lib/utils';
import { ProfileDiri } from './profile-diri';

export function NavUser() {
  const { data: user } = useQuery(getCurrentUserQuery());
  const mutation = useLogout();
  const [stateMyProfile, setStateMyProfile] = useState(false);

  return (
    <>
      <Dialog open={stateMyProfile} onOpenChange={setStateMyProfile}>
        <DialogContent className="max-h-[85vh] overflow-y-auto bg-white sm:max-w-[600px]">
          <DialogHeader hidden>
            <DialogTitle className="text-xl font-semibold">Account</DialogTitle>
          </DialogHeader>
          <ProfileDiri />
        </DialogContent>
      </Dialog>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={() => setStateMyProfile(true)}>
            <UserPen />
            <span>Update My Account</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Logout"
            onClick={() => mutation.mutate()}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarFallback className="rounded-lg">{getAlias(user?.name || '')}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.name}</span>
              <span className="text-muted-foreground truncate text-xs">{user?.email}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
