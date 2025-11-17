import { useState } from 'react';
import { DataTable } from './data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { ExternalLink, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import { Spinner } from '~/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { getAllUsersQuery, getUserByIdQuery, useDeleteUser } from '~/lib/api/user';
import { toast } from 'sonner';

const createColumns = (
  onDelete: (id: string) => void,
  onViewDetails: (user: { id: string; name: string; email: string }) => void
): ColumnDef<{ id: string; name: string; email: string }>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="font-semibold text-gray-900">{row.original.name}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.email}</div>,
    enableSorting: false,
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>Copy user ID</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewDetails(user)}>View details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(user.id)}>
                Delete user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
  },
];

export function UsersTable() {
  const { data: usersData, isLoading } = useQuery(getAllUsersQuery());
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const deleteMutation = useDeleteUser();

  const { data: selectedUserData } = useQuery({
    ...getUserByIdQuery(selectedUserId || ''),
    enabled: !!selectedUserId && isDetailsOpen,
  });

  const onDelete = (id: string) => {
    toast.promise(deleteMutation.mutateAsync(id), {
      loading: 'Loading...',
    });
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    selectedIds.forEach((id) => {
      onDelete(id);
    });
  };

  const handleViewDetails = (user: { id: string; name: string; email: string }) => {
    setSelectedUserId(user.id);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const users = Array.isArray(usersData) ? usersData : usersData ? [usersData] : [];

  return (
    <div className="w-full space-y-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <DataTable
        columns={createColumns(handleDelete, handleViewDetails)}
        data={users}
        searchKey="name"
        searchPlaceholder="Filter by name..."
        onBulkDelete={handleBulkDelete}
      />

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUserData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base font-semibold wrap-break-word">{selectedUserData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base break-all">{selectedUserData.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="font-mono text-sm break-all">{selectedUserData.id}</p>
                </div>
                {selectedUserData.google_id && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Google ID</p>
                    <p className="font-mono text-sm break-all">{selectedUserData.google_id}</p>
                  </div>
                )}
                {selectedUserData.team_id && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Team ID</p>
                    <p className="font-mono text-sm break-all">{selectedUserData.team_id}</p>
                  </div>
                )}
                {selectedUserData.cv_url && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">CV URL</p>
                    <a
                      href={selectedUserData.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <span className="break-all">{selectedUserData.cv_url.replace('/file/cv/', '')}</span>
                      <ExternalLink className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                )}
                {selectedUserData.is_admin !== undefined && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Admin Status</p>
                    <Badge variant={selectedUserData.is_admin ? 'default' : 'secondary'} className="mt-1">
                      {selectedUserData.is_admin ? 'Admin' : 'User'}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
