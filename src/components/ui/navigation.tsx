import { Avatar, AvatarImage } from './avatar';
import { Input } from '~/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '~/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';

export function Navigation({ className }: React.ComponentProps<'input'>) {
  const user = useQuery(getCurrentUserQuery());

  return (
    <nav className={cn('bg-transparent px-[100px] py-6', className)}>
      <div className="flex w-full items-center rounded-3xl bg-white/40 p-4 shadow-lg backdrop-blur-sm">
        {/* Logo Section - Fixed Width */}
        <div className="flex w-[250px] items-center space-x-4 px-3.5 py-3">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
          <div className="text-xl font-bold">ReCapstone</div>
        </div>

        {/* Search Section - Centered */}
        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-[850px]">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Cari Capstone Project..."
              className="h-[50px] w-full rounded-[12px] border-white bg-gray-50/50 pl-12 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* User Profile Section - Fixed Width */}
        <div className="flex w-[250px] items-center justify-end space-x-3 px-4">
          <Avatar className="h-12 w-12 border-2 border-blue-500">
            <AvatarImage src="/logo.svg" alt="User Avatar" />
          </Avatar>
          <div>
            <div className="text-sm font-semibold">{user?.data?.name}</div>
            <div className="text-primary flex items-center space-x-2 text-xs">
              <span>Anggota</span>
              <span className="text-primary">•</span>
              <span>Nama_Kelompok</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
