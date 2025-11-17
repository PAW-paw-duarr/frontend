import { Crown, User } from 'lucide-react';
import type { components } from '~/lib/api-schema';
import { cn } from '~/lib/utils';

interface MemberTeamProps {
  leaderEmail?: string;
  dataMember: components['schemas']['data-user-short'][];
  toggleProfileDialog: (profileId: string) => void;
  variant?: 'default' | 'compact';
}
export function MemberTeam({ leaderEmail, toggleProfileDialog, dataMember, variant = 'default' }: MemberTeamProps) {
  return (
    <>
      {dataMember?.map((member, index) => (
        <button
          onClick={() => toggleProfileDialog(member.id)}
          key={index}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-xl font-semibold transition-all',
            variant === 'compact'
              ? 'px-2 py-1.5 text-xs sm:gap-2 sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm'
              : 'px-3 py-2 text-sm sm:w-auto sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base',
            member.email === leaderEmail
              ? 'bg-black text-white hover:bg-gray-800'
              : 'border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
          )}
        >
          {member.email === leaderEmail ? (
            <Crown
              className={cn(
                'shrink-0',
                variant === 'compact' ? 'h-3 w-3 sm:h-4 sm:w-4' : 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6'
              )}
            />
          ) : (
            <User
              className={cn(
                'shrink-0',
                variant === 'compact' ? 'h-3 w-3 sm:h-4 sm:w-4' : 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6'
              )}
            />
          )}
          <span className="truncate">{member.name}</span>
        </button>
      ))}
    </>
  );
}
