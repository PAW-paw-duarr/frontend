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
import type { components } from '~/lib/api-schema';
import { getAllTitlesQuery, getTitleByIdQuery, useDeleteTitle } from '~/lib/api/title';
import { toast } from 'sonner';

const createColumns = (
  onDelete: (id: string) => void,
  onViewDetails: (title: components['schemas']['data-title-short']) => void,
  onDownload: (url: string) => void
): ColumnDef<components['schemas']['data-title-short']>[] => [
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
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className="font-semibold text-gray-900">{row.original.title}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'short description',
    header: 'Short Description',
    cell: ({ row }) => <div className="max-w-xs truncate text-sm text-gray-700">{row.original.desc}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'photo',
    header: 'Photo',
    cell: ({ row }) => {
      const photoUrl = row.original.photo_url;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">{photoUrl.replace('/file/photos/', '')}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDownload(photoUrl)}
            className="h-6 w-6 rounded-md bg-gray-900 p-0 text-white hover:bg-gray-700 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const title = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(title.id)}>Copy title ID</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewDetails(title)}>View details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(title.id)}>
                Delete title
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
  },
];

export function TitlesTable() {
  const { data: titlesData, isLoading } = useQuery(getAllTitlesQuery());
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const deleteMutation = useDeleteTitle();

  const { data: selectedTitleData } = useQuery({
    ...getTitleByIdQuery(selectedTitleId || ''),
    enabled: !!selectedTitleId && isDetailsOpen,
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

  const handleViewDetails = (title: components['schemas']['data-title-short']) => {
    setSelectedTitleId(title.id);
    setIsDetailsOpen(true);
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const titles = Array.isArray(titlesData) ? titlesData : titlesData ? [titlesData] : [];

  return (
    <div className="w-full space-y-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <DataTable
        columns={createColumns(handleDelete, handleViewDetails, handleDownload)}
        data={titles}
        searchKey="title"
        searchPlaceholder="Filter by title..."
        onBulkDelete={handleBulkDelete}
      />

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Title Details</DialogTitle>
          </DialogHeader>
          {selectedTitleData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Title</p>
                  <p className="text-base font-semibold wrap-break-word">{selectedTitleData.title}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-base">{selectedTitleData.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge variant={selectedTitleData.is_taken ? 'destructive' : 'secondary'} className="mt-1">
                    {selectedTitleData.is_taken ? 'Taken' : 'Available'}
                  </Badge>
                </div>
                {selectedTitleData.team_id && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Team ID</p>
                    <p className="font-mono text-sm break-all">{selectedTitleData.team_id}</p>
                  </div>
                )}
                {selectedTitleData.proposal_url && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Proposal URL</p>
                    <a
                      href={selectedTitleData.proposal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <span className="break-all">
                        {selectedTitleData.proposal_url.replace('/file/proposals/', '')}
                      </span>
                      <ExternalLink className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                )}
                {selectedTitleData.photo_url && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Photo</p>
                    <img
                      src={selectedTitleData.photo_url}
                      alt={selectedTitleData.title}
                      className="mt-2 max-h-48 rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Title ID</p>
                  <p className="font-mono text-sm break-all">{selectedTitleData.id}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
