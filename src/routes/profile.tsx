import { createFileRoute } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';
import { getTeamByIdQuery } from '~/lib/api/team';
import { ProfileDiri } from '~/features/profile/profile-diri';
import { ProfileTim } from '~/features/profile/profile-tim';
import { useState } from 'react';

export const Route = createFileRoute('/profile')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login', search: { redirect: '/profile' } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<'profile-diri' | 'profile-tim'>('profile-diri');
  const { data: user } = useSuspenseQuery(getCurrentUserQuery());

  // Type guard
  if (!user?.name || !user?.email) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="text-center">
          <p>User not found</p>
        </div>
      </div>
    );
  }

  // Fetch team if user has team_id
  let team = null;
  if (user.team_id) {
    const teamQuery = useSuspenseQuery(getTeamByIdQuery(user.team_id));
    team = teamQuery.data;
  }

  return (
    <div className="min-h-svh bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600 text-sm">{team?.name ? 'Tim • ' + team.name : 'Belum bergabung tim'}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b">
            <button
              onClick={() => setActiveTab('profile-diri')}
              className={`pb-3 font-medium transition-colors ${
                activeTab === 'profile-diri'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👤 Profile Diri
            </button>
            <button
              onClick={() => setActiveTab('profile-tim')}
              className={`pb-3 font-medium transition-colors ${
                activeTab === 'profile-tim'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👥 Profile Tim
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {activeTab === 'profile-diri' && (
          <div className="max-w-2xl">
            <ProfileDiri
              user={{
                name: user.name,
                email: user.email,
                cv_url: user.cv_url,
              }}
            />
          </div>
        )}

        {activeTab === 'profile-tim' && (
          <div className="max-w-2xl">
            <ProfileTim
              team={team}
              isTeamLeader={team?.leader_email === user.email}
            />
          </div>
        )}
      </div>
    </div>
  );
}
