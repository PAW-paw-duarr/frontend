import { useState } from 'react';
import { DataTable } from '../components/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Spinner } from '~/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { getAllTeamQuery, getTeamByIdQuery, useDeleteTeam } from '~/lib/api/team';
import type { components } from '~/lib/api-schema';

const createColumns = (
  onDelete: (id: string) => void,
  onViewDetails: (team: components['schemas']['data-team-short']) => void
): ColumnDef<components['schemas']['data-team-short']>[] => [
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
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.category}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'leader email',
    header: 'Leader Email',
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.leader_email}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'period',
    header: () => <div className="text-center">Period</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span className="font-medium text-gray-900">{row.original.period}</span>
      </div>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const team = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(team.id)}>Copy team ID</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewDetails(team)}>View details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(team.id)}>
                Delete team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
  },
];

export function TeamsTable() {
  const { data: teamsData, isLoading } = useQuery(getAllTeamQuery());
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const deleteMutation = useDeleteTeam();

  const { data: selectedTeamData } = useQuery({
    ...getTeamByIdQuery(selectedTeamId || ''),
    enabled: !!selectedTeamId && isDetailsOpen,
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    selectedIds.forEach((id) => {
      deleteMutation.mutate(id);
    });
  };

  const handleViewDetails = (team: components['schemas']['data-team-short']) => {
    setSelectedTeamId(team.id);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const teams = Array.isArray(teamsData) ? teamsData : teamsData ? [teamsData] : [];

  return (
    <div className="w-full space-y-4 px-12">
      <DataTable
        columns={createColumns(handleDelete, handleViewDetails)}
        data={teams}
        searchKey="name"
        searchPlaceholder="Filter by name..."
        onBulkDelete={handleBulkDelete}
      />

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Team Details</DialogTitle>
          </DialogHeader>
          {selectedTeamData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Name</p>
                  <p className="text-base font-semibold wrap-break-word">{selectedTeamData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <Badge variant="secondary" className="mt-1">
                    {selectedTeamData.category}
                  </Badge>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Leader Email</p>
                  <p className="text-base break-all">{selectedTeamData.leader_email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Period</p>
                  <p className="text-base">{selectedTeamData.period}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Code</p>
                  <p className="font-mono text-base break-all">{selectedTeamData.code}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Team ID</p>
                  <p className="font-mono text-sm break-all">{selectedTeamData.id}</p>
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Members ({selectedTeamData.member?.length || 0})
                </p>
                <ScrollArea className="h-60 rounded-md border">
                  <div className="space-y-2 p-4">
                    {selectedTeamData.member && selectedTeamData.member.length > 0 ? (
                      selectedTeamData.member.map((member) => (
                        <div key={member.id} className="rounded-lg border p-3">
                          <div className="font-medium wrap-break-word">{member.name}</div>
                          <div className="text-sm break-all text-gray-600">{member.email}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No members yet</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
