import { useProfileDialogStore } from '~/hooks/global';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ProfileOrangBase } from './profile-dialog-orang-base';

export function ProfileOrangT() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/t' });
  const profileId = searchParams?.p || '';
  const setStateProfile = useProfileDialogStore((state) => state.setState);

  function onClose() {
    setStateProfile(false);
    navigate({ to: '.', search: (old) => ({ ...old, p: undefined }), resetScroll: false });
  }

  return <ProfileOrangBase profileId={profileId} onClose={onClose} />;
}

export function ProfileOrangS() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/s' });
  const profileId = searchParams?.p || '';
  const setStateProfile = useProfileDialogStore((state) => state.setState);

  function onClose() {
    setStateProfile(false);
    navigate({ to: '.', search: (old) => ({ ...old, p: undefined }), resetScroll: false });
  }

  return <ProfileOrangBase profileId={profileId} onClose={onClose} />;
}