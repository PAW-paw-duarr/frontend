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
import { getAllSubmissionQuery, getSubmissionByIdQuery, useDeleteSubmission } from '~/lib/api/submission';

const createColumns = (
  onDelete: (id: string) => void,
  onViewDetails: (submission: { id: string; team_id: string; team_target_id: string }) => void
): ColumnDef<{ id: string; team_id: string; team_target_id: string }>[] => [
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
    accessorKey: 'team id',
    header: 'Team ID',
    cell: ({ row }) => <div className="font-mono text-sm text-gray-900">{row.original.team_id}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'team target id',
    header: 'Team Target ID',
    cell: ({ row }) => <div className="font-mono text-sm text-gray-700">{row.original.team_target_id}</div>,
    enableSorting: false,
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const submission = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(submission.id)}>
                Copy submission ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewDetails(submission)}>View details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(submission.id)}>
                Delete submission
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
  },
];

export function SubmissionsTable() {
  const { data: submissionsData, isLoading } = useQuery(getAllSubmissionQuery());
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const deleteMutation = useDeleteSubmission();

  const { data: selectedSubmissionData } = useQuery({
    ...getSubmissionByIdQuery(selectedSubmissionId || ''),
    enabled: !!selectedSubmissionId && isDetailsOpen,
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    selectedIds.forEach((id) => {
      deleteMutation.mutate(id);
    });
  };

  const handleViewDetails = (submission: { id: string; team_id: string; team_target_id: string }) => {
    setSelectedSubmissionId(submission.id);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const titles = Array.isArray(submissionsData) ? submissionsData : submissionsData ? [submissionsData] : [];

  return (
    <div className="w-full space-y-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <DataTable
        columns={createColumns(handleDelete, handleViewDetails)}
        data={titles}
        searchKey="team_id"
        searchPlaceholder="Filter by team ID..."
        onBulkDelete={handleBulkDelete}
      />

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          {selectedSubmissionData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Team ID</p>
                  <p className="font-mono text-sm break-all">{selectedSubmissionData.team_id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Target ID</p>
                  <p className="font-mono text-sm break-all">{selectedSubmissionData.team_target_id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge variant={selectedSubmissionData.accepted ? 'default' : 'secondary'} className="mt-1">
                    {selectedSubmissionData.accepted ? 'Accepted' : 'Pending'}
                  </Badge>
                </div>
                {selectedSubmissionData.grand_design_url && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Grand Design URL</p>
                    <a
                      href={selectedSubmissionData.grand_design_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <span className="break-all">
                        {selectedSubmissionData.grand_design_url.replace('/file/grand_design/', '')}
                      </span>
                      <ExternalLink className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                )}
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Submission ID</p>
                  <p className="font-mono text-sm break-all">{selectedSubmissionData.id}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
