import { createFileRoute } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';
import { AdminLayout } from '~/features/admin/admin-layout';
import { useState } from 'react';

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login', search: { redirect: '/admin' } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<'user' | 'team' | 'title' | 'submission'>('user');
  const { data: user } = useSuspenseQuery(getCurrentUserQuery());

  // Check if user is admin - untuk sementara check dari localStorage atau hardcode
  // TODO: Update backend API untuk return is_admin field
  const isAdmin = localStorage.getItem('isAdmin') === 'true' || user?.email === 'admin@example.com';

  if (!isAdmin) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-600">Anda tidak memiliki akses ke halaman ini</p>
        </div>
      </div>
    );
  }

  return <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} />;
}
