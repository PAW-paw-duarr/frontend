import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { SidebarTrigger } from '~/components/ui/sidebar';
import { getCurrentUserQuery } from '~/lib/api/user';
import { getAlias } from '~/lib/utils';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  const { data: user } = useQuery(getCurrentUserQuery());
  return (
    <header className="sticky top-0 z-10 flex h-25 shrink-0 items-center justify-between border-b bg-white pr-18 pl-2">
      {/* Left: Trigger + Icon + Title + Breadcrumb */}
      <div className="flex items-center gap-1">
        <SidebarTrigger />
        <div className="ml-1 h-8 w-0.5 bg-gray-300" />
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
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-600">{user?.email}</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarFallback>{getAlias(user?.name ?? '')}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
