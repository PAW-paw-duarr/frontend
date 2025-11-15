import { Avatar, AvatarImage } from './avatar';
import { Input } from '~/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '~/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';
import { useState, useEffect } from 'react';

export function Navigation({ className }: React.ComponentProps<'input'>) {
  const user = useQuery(getCurrentUserQuery());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ubah threshold sesuai kebutuhan (misal 100px atau height dari hero section)
      const scrollThreshold = 580; // Adjust ini sesuai tinggi hero section
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    // Tambahkan event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn('fixed top-0 right-0 left-0 z-50 bg-transparent px-36 py-6', className)}>
      <div
        className={cn(
          'glass flex w-full items-center rounded-3xl p-4 shadow-lg backdrop-blur-sm transition-all duration-300',
          isScrolled ? 'outline outline-gray-200' : 'border-none' // Tambah background putih saat scroll
        )}
      >
        {/* Logo Section - Fixed Width */}
        <div className="flex w-[250px] items-center space-x-4 px-3.5 py-3">
          <img
            src="/logo.svg"
            alt="ReCapstone Logo"
            className={cn('h-10 w-10 duration-200', isScrolled ? 'invert-0' : 'invert')}
          />
          <div
            className={cn(
              'text-xl font-bold transition-colors duration-300',
              isScrolled ? 'text-gray-900' : 'text-white'
            )}
          >
            ReCapstone
          </div>
        </div>

        {/* Search Section - Centered */}
        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-[850px]">
            <Search
              className={cn(
                'absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform transition-colors duration-200',
                isScrolled ? 'text-primary' : 'text-gray-100'
              )}
            />
            <Input
              placeholder="Cari Capstone Project..."
              className={cn(
                'h-[50px] w-full rounded-[12px] border-white pl-12 transition-colors duration-200 focus:ring-2 focus:ring-blue-500',
                isScrolled
                  ? 'placeholder:text-primary bg-gray-200/60 text-gray-900'
                  : 'bg-gray-50/30 text-white placeholder:text-gray-100'
              )}
            />
          </div>
        </div>

        {/* User Profile Section - Fixed Width */}
        <div className="flex w-[250px] items-center justify-end space-x-3 px-4">
          <Avatar className="h-12 w-12 border-2 border-blue-500">
            <AvatarImage src="/logo.svg" alt="User Avatar" />
          </Avatar>
          <div>
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
              <span>Anggota</span>
              <span>•</span>
              <span>Nama_Kelompok</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
