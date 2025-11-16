import { Avatar } from '~/components/ui/avatar';
import { Input } from '~/components/ui/input';
import { Search } from 'lucide-react';
import { cn, getAlias } from '~/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';
import { useState, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { getTeamByIdQuery } from '~/lib/api/team';
import { useMyProfileDialogStore } from '~/hooks/global';
import { DialogProfile } from '~/features/profile/components/profile-dialog';

export function Navigation({ className }: React.ComponentProps<'input'>) {
  const user = useQuery(getCurrentUserQuery());
  const { data: teamData } = useQuery(getTeamByIdQuery(user?.data?.team_id || ''));
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/' });
  const [searchValue, setSearchValue] = useState(searchParams?.q || '');
  const isOpen = searchParams?.p === 'me';
  const stateMyProfile = useMyProfileDialogStore((state) => state.state);
  const setStateMyProfile = useMyProfileDialogStore((state) => state.setState);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 580;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setStateMyProfile(isOpen);
  }, [isOpen, setStateMyProfile]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    navigate({
      to: '/',
      search: { q: value },
      replace: true,
    });
  };

  function toggleProfileDialog() {
    setStateMyProfile(false);
    navigate({
      to: '/',
      search: (old) => ({ ...old, p: 'me' }),
      replace: true,
      resetScroll: false,
    });
    setStateMyProfile(true);
  }

  return (
    <nav
      className={cn('fixed top-0 right-0 left-0 z-50 bg-transparent px-6 py-6 md:px-20 lg:px-24 xl:px-36', className)}
    >
      {stateMyProfile && <DialogProfile />}
      <div
        className={cn(
          'glass flex w-full items-center justify-between gap-6 rounded-2xl p-1 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out md:rounded-3xl md:p-4',
          isScrolled ? 'outline outline-gray-200' : 'border-none'
        )}
      >
        <div className="flex items-center space-x-4 px-3.5 py-3">
          <img
            src="/logo.svg"
            alt="ReCapstone Logo"
            className={cn('h-10 w-10 duration-200', isScrolled ? 'invert-0' : 'invert')}
          />
          <div
            className={cn(
              'text-md font-bold transition-colors duration-300 md:text-xl',
              isScrolled ? 'text-gray-900' : 'text-white'
            )}
          >
            ReCapstone
          </div>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-[850px] text-white">
            <Search
              className={cn(
                'absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform transition-colors duration-200',
                isScrolled ? 'text-primary' : 'text-gray-100'
              )}
            />
            <Input
              placeholder="Cari Capstone Project..."
              value={searchValue}
              onChange={handleSearchChange}
              className={cn(
                'h-[50px] rounded-[12px] border-white pl-12 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 2xl:w-full',
                isScrolled
                  ? 'placeholder:text-primary bg-gray-200/60 text-gray-900'
                  : 'bg-gray-50/30 text-white placeholder:text-gray-100'
              )}
            />
          </div>
        </div>

        <button
          className="flex cursor-pointer items-center justify-end space-x-3 rounded-lg transition-all duration-200 md:px-4"
          onClick={() => toggleProfileDialog()}
        >
          <Avatar className="flex h-12 w-12 items-center justify-center border-2 border-blue-500 bg-blue-100">
            <AvatarFallback className="text-blue-700">{getAlias(user?.data?.name ?? '')}</AvatarFallback>
          </Avatar>

          <div className="hidden md:flex md:flex-col">
            <div
              className={cn(
                'text-md font-bold transition-colors duration-200',
                isScrolled ? 'text-primary' : 'text-white'
              )}
            >
              {user?.data?.name}
            </div>
            <div
              className={cn(
                'flex items-center space-x-2 text-sm font-medium transition-colors duration-200',
                isScrolled ? 'text-primary' : 'text-white'
              )}
            >
              <span>{teamData?.leader_email === user?.data?.email ? 'Ketua' : 'Anggota'}</span>
              <span>•</span>
              <span>{teamData?.name}</span>
            </div>
          </div>
        </button>
      </div>
      <div className="relative mt-3 flex w-full md:hidden">
        <Search
          className={cn(
            'absolute top-1/2 left-4 z-20 h-5 w-5 -translate-y-1/2 transform transition-colors duration-200',
            isScrolled ? 'text-primary' : 'text-gray-100'
          )}
        />
        <Input
          placeholder="Cari Capstone Project..."
          value={searchValue}
          onChange={handleSearchChange}
          className={cn(
            'glass h-[50px] rounded-[12px] border-white pl-12 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 2xl:w-full',
            isScrolled
              ? 'placeholder:text-primary bg-gray-200/60 text-gray-900'
              : 'bg-gray-50/30 text-white placeholder:text-gray-100'
          )}
        />
      </div>
    </nav>
  );
}
