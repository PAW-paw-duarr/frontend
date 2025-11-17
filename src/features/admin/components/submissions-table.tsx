import { useState } from 'react';
import { DataTable } from './data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { MoreHorizontal, Pencil, Download, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import type { Submission } from './admin';

const createColumns = (onDelete: (id: string) => void, onDownload: (url: string) => void): ColumnDef<Submission>[] => [
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
    accessorKey: 'tim',
    header: 'Tim',
    cell: ({ row }) => <div className="font-semibold text-gray-900">{row.getValue('tim')}</div>,
    enableSorting: false,
  },
  {
    id: 'arrow',
    header: () => <div className="w-12" />,
    cell: () => (
      <div className="flex items-center justify-center">
        <ArrowRight className="h-5 w-5 text-gray-400" />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 48,
  },
  {
    accessorKey: 'targetTim',
    header: 'Target Tim',
    cell: ({ row }) => {
      const targetTim = row.getValue('targetTim') as string;
      return <div className="max-w-[300px] truncate text-sm text-gray-600">{targetTim}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'grandDesign',
    header: 'Grand Design',
    cell: ({ row }) => {
      const grandDesign = row.getValue('grandDesign') as string;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">{grandDesign}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDownload(`/uploads/grand-design/${grandDesign}`)}
            className="h-6 w-6 rounded-md bg-gray-900 p-0 text-white hover:bg-gray-700 hover:text-white"
          >
            <Download className="h-3.5 w-3.5" />
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
      const submission = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
            <Pencil className="h-4 w-4 text-gray-600" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(submission.id)}>Copy ID</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(submission.id)}>
                Delete
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
  const [tableData, setTableData] = useState<Submission[]>([
    {
      id: '1',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '2',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '3',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '4',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '5',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '6',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '7',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '8',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '9',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '10',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '11',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
    {
      id: '12',
      tim: 'Eco Tech',
      targetTim: 'Smartbin...',
      grandDesign: 'inimahjokowi.pdf',
    },
  ]);

  const handleDelete = (id: string) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    setTableData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full space-y-4 px-12">
      <DataTable
        columns={createColumns(handleDelete, handleDownload)}
        data={tableData}
        searchKey="tim"
        searchPlaceholder="Filter by tim..."
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
