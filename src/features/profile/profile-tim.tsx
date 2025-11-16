import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { FileText, Users, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useAccOrRejectSubmission } from '~/lib/api/team';
import { useQueryClient } from '@tanstack/react-query';
import type { components } from '~/lib/api-schema';

type TeamData = components['schemas']['data-team'];

interface ProfileTimProps {
  team?: TeamData | null;
  isTeamLeader?: boolean;
}

export function ProfileTim({ team, isTeamLeader = false }: ProfileTimProps) {
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
  const kickMemberMutation = useAccOrRejectSubmission();
  const queryClient = useQueryClient();

  const handleKickMember = async (memberId: string) => {
    if (!confirm('Yakin ingin mengeluarkan anggota ini dari tim?')) return;

    try {
      await kickMemberMutation.mutateAsync(memberId);
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    } catch (error) {
      console.error('Failed to kick member:', error);
    }
  };

  if (!team) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Profile Tim</CardTitle>
          <CardDescription>Lihat informasi tim Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600 text-sm">Anda belum bergabung dengan tim</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Profile Tim</CardTitle>
        <CardDescription>Lihat daftar tim Anda dan informasi terkait</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tim Info */}
        <div className="pb-6 border-b">
          <h3 className="font-semibold mb-2">{team.name}</h3>
          <p className="text-xs text-gray-600">Tim • {(team.member?.length || 0)} Anggota</p>
        </div>

        {/* Nama Anggota */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold text-sm">Nama Anggota</h3>
          </div>
          <div className="space-y-2">
            {team.member?.map((member) => (
              <div
                key={member.id}
                onMouseEnter={() => setHoveredMemberId(member.id || null)}
                onMouseLeave={() => setHoveredMemberId(null)}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded relative group"
              >
                <span className="text-sm font-medium text-gray-700 flex-1">
                  {member.name}
                </span>
                {isTeamLeader && hoveredMemberId === member.id && (
                  <button
                    onClick={() => member.id && handleKickMember(member.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    disabled={kickMemberMutation.isPending}
                    title="Kick member"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alert Ketua Tim */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                {isTeamLeader
                  ? 'Sebagai ketua tim, Anda memiliki akses untuk mengelola anggota tim'
                  : 'Anda adalah anggota dari tim ini'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
