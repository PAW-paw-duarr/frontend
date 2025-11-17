import { Avatar } from '~/components/ui/avatar';
import { Input } from '~/components/ui/input';
import { Search, LogOut } from 'lucide-react';
import { cn, getAlias } from '~/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';
import { useState, useEffect } from 'react';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { getTeamByIdQuery } from '~/lib/api/team';
import { useMyProfileDialogStore } from '~/hooks/global';
import { DialogProfile } from '~/features/profile/profile-dialog';
import { useLogout } from '~/lib/api/auth';
import { toast } from 'sonner';

interface NavigationBaseProps {
  className?: string;
  searchValue: string;
  isOpen: boolean;
  onSearchChange: (value: string) => void;
  onProfileClick: () => void;
  textSearch: string;
}

export function NavigationBase({
  className,
  searchValue,
  isOpen,
  onSearchChange,
  onProfileClick,
  textSearch,
}: NavigationBaseProps) {
  const user = useQuery(getCurrentUserQuery());
  const { data: teamData } = useQuery(getTeamByIdQuery(user?.data?.team_id || ''));
  const [isScrolled, setIsScrolled] = useState(false);
  const stateMyProfile = useMyProfileDialogStore((state) => state.state);
  const setStateMyProfile = useMyProfileDialogStore((state) => state.setState);
  const logoutMutation = useLogout();

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
    onSearchChange(e.target.value);
  };

  const onLogout = () => {
    toast.promise(logoutMutation.mutateAsync(), {
      loading: 'Loading...',
    });
  };

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
              placeholder={textSearch}
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

        <div className="flex items-center gap-1 pr-2 sm:gap-2 sm:pr-0">
          <button
            className="flex cursor-pointer items-center justify-start space-x-3 rounded-lg transition-all duration-200 md:px-4"
            onClick={onProfileClick}
          >
            <Avatar
              className={cn(
                'glass flex h-12 w-12 items-center justify-center rounded-lg border-2 shadow-lg backdrop-blur-sm transition-all duration-200',
                isScrolled ? 'border-blue-500/40 bg-blue-50/95' : 'border-blue-400/60 bg-white/90'
              )}
            >
              <AvatarFallback
                className={cn(
                  'rounded-lg text-base font-bold transition-colors duration-200',
                  isScrolled ? 'text-blue-900' : 'text-blue-900'
                )}
              >
                {getAlias(user?.data?.name ?? '')}
              </AvatarFallback>
            </Avatar>

            <div className="hidden md:flex md:flex-col">
              <div
                className={cn(
                  'text-md text-start font-bold transition-colors duration-200',
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
                <span>{teamData?.leader_email === user?.data?.email ? 'Leader' : 'Member'}</span>
                <span>•</span>
                <span>{teamData?.name}</span>
              </div>
            </div>
          </button>

          <button
            onClick={onLogout}
            className={cn(
              'glass flex h-12 w-12 items-center justify-center rounded-lg shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105',
              isScrolled ? 'bg-gray-200/60 hover:bg-gray-300/60' : 'bg-gray-50/30 hover:bg-gray-50/40'
            )}
            title="Logout"
          >
            <LogOut
              className={cn('h-5 w-5 transition-colors duration-200', isScrolled ? 'text-primary' : 'text-white')}
            />
          </button>
        </div>
      </div>
      <div className="relative mt-3 flex w-full md:hidden">
        <Search
          className={cn(
            'absolute top-1/2 left-4 z-20 h-5 w-5 -translate-y-1/2 transform transition-colors duration-200',
            isScrolled ? 'text-primary' : 'text-gray-100'
          )}
        />
        <Input
          placeholder="Search Capstone Project..."
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
