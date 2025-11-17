import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Separator } from '~/components/ui/separator';
import { SidebarTrigger } from '~/components/ui/sidebar';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function PageHeader({ title, breadcrumbs, user }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-25 shrink-0 items-center justify-between border-b bg-white pr-18 pl-2">
      {/* Left: Trigger + Icon + Title + Breadcrumb */}
      <div className="flex items-center gap-1">
        <SidebarTrigger />
        <div className="ml-1 h-8 w-[2px] bg-gray-300" />
        {/* Title & Breadcrumb */}
        <div className="flex flex-col pl-2">
          <h1 className="text-3xl leading-tight font-bold">{title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-gray-900">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-gray-900">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
