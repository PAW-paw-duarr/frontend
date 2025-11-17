import { useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMyProfileDialogStore } from '~/hooks/global';
import { NavigationBase } from './navigation-base';

export function NavigationT({ className }: React.ComponentProps<'input'>) {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/t' });
  const [searchValue, setSearchValue] = useState(searchParams?.q || '');
  const isOpen = searchParams?.p === 'me';
  const setStateMyProfile = useMyProfileDialogStore((state) => state.setState);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    navigate({
      to: '.',
      search: { q: value },
      replace: true,
    });
  };

  function toggleProfileDialog() {
    setStateMyProfile(false);
    navigate({
      to: '.',
      search: (old) => ({ ...old, p: 'me' }),
      replace: true,
      resetScroll: false,
    });
    setStateMyProfile(true);
  }

  return (
    <NavigationBase
      className={className}
      searchValue={searchValue}
      isOpen={isOpen}
      onSearchChange={handleSearchChange}
      onProfileClick={toggleProfileDialog}
      textSearch="Search Capstone Project..."
    />
  );
}

export function NavigationS({ className }: React.ComponentProps<'input'>) {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/s' });
  const [searchValue, setSearchValue] = useState(searchParams?.q || '');
  const isOpen = searchParams?.p === 'me';
  const setStateMyProfile = useMyProfileDialogStore((state) => state.setState);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    navigate({
      to: '.',
      search: { q: value },
      replace: true,
    });
  };

  function toggleProfileDialog() {
    setStateMyProfile(false);
    navigate({
      to: '.',
      search: (old) => ({ ...old, p: 'me' }),
      replace: true,
      resetScroll: false,
    });
    setStateMyProfile(true);
  }

  return (
    <NavigationBase
      className={className}
      searchValue={searchValue}
      isOpen={isOpen}
      onSearchChange={handleSearchChange}
      onProfileClick={toggleProfileDialog}
      textSearch="Search Submission Id..."
    />
  );
}
