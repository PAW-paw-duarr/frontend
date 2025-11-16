import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllUsersQuery } from '~/lib/api/user';
import { getAllTeamQuery } from '~/lib/api/team';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Users, Layers, FileText, Edit, Trash2, Download, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { components } from '~/lib/api-schema';
import { EditUserSidebar } from '~/features/admin/components/edit-user-sidebar';
import { toast } from 'sonner';

type User = components['schemas']['data-user'];

export function UserManagement() {
  const { data: users = [] } = useSuspenseQuery(getAllUsersQuery());
  const { data: teams = [] } = useSuspenseQuery(getAllTeamQuery());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'nama' | 'email' | 'tim'>('nama');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const activeUsers = Array.isArray(users) ? users.length : 0;
  const totalTeams = Array.isArray(teams) ? teams.length : 0;
  const totalSubmissions = 0; // TODO: fetch from API

  // Filter users berdasarkan search query dan tipe
  const filteredUsers = useMemo(() => {
    if (!searchQuery || !Array.isArray(users)) return users || [];

    return users.filter((user: any) => {
      const query = searchQuery.toLowerCase();
      
      if (searchType === 'nama') {
        return user.name?.toLowerCase().includes(query);
      } else if (searchType === 'email') {
        return user.email?.toLowerCase().includes(query);
      } else if (searchType === 'tim') {
        return user.team_id ? 'team member'.includes(query) : false;
      }
      return true;
    });
  }, [users, searchQuery, searchType]);

  const stats = [
    {
      label: 'Total Tim Capstone',
      value: totalTeams,
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Pengajuan Capstone',
      value: totalSubmissions,
      icon: FileText,
      color: 'yellow',
    },
    {
      label: 'Total Pengguna Aktif',
      value: activeUsers,
      icon: Layers,
      color: 'green',
    },
  ];

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (data: any) => {
    console.log('Saving user:', data);
    // TODO: Implement API call to update user
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = (user: any) => {
    if (confirm(`Yakin ingin menghapus user ${user.name}?`)) {
      console.log('Deleting user:', user.id);
      // TODO: Implement API call to delete user
      toast.success(`User ${user.name} berhasil dihapus`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stat.color === 'blue'
                        ? 'bg-blue-100 text-blue-600'
                        : stat.color === 'yellow'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Kelola semua pengguna dalam sistem</CardDescription>
          </div>
          <Button className="bg-black hover:bg-gray-800 gap-2">
            <Download className="w-4 h-4" />
            Import
          </Button>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-6 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Cari pengguna..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <option value="nama">Cari by Nama</option>
              <option value="email">Cari by Email</option>
              <option value="tim">Cari by Tim</option>
            </select>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Nama</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Tim</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Curriculum Vitae</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user: any, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{user.name || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.team_id ? 'Team Member' : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        User
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.cv_url ? (
                        <a
                          href={user.cv_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs font-medium"
                        >
                          View CV
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 hover:bg-red-100 rounded transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              0 of {users.length} records selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Sidebar */}
      {selectedUser && (
        <EditUserSidebar
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          teams={Array.isArray(teams) ? teams : []}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}
