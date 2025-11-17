import { useState } from 'react';
import { DataTable } from '../components/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { MoreHorizontal, Pencil, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import type { TitleCapstone } from './admin';

const createColumns = (
  onDelete: (id: string) => void,
  onDownload: (url: string) => void
): ColumnDef<TitleCapstone>[] => [
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
    accessorKey: 'judul',
    header: 'Judul',
    cell: ({ row }) => <div className="font-semibold text-gray-900">{row.getValue('judul')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'deskripsi',
    header: 'Deskripsi',
    cell: ({ row }) => {
      const deskripsi = row.getValue('deskripsi') as string;
      return <div className="max-w-[200px] truncate text-sm text-gray-600">{deskripsi}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'photo',
    header: 'Photo',
    cell: ({ row }) => {
      const photo = row.getValue('photo') as string;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">{photo}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDownload(`/uploads/photos/${photo}`)}
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
    accessorKey: 'proposal',
    header: 'Proposal',
    cell: ({ row }) => {
      const proposal = row.getValue('proposal') as string;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">{proposal}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDownload(`/uploads/proposals/${proposal}`)}
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
    accessorKey: 'period',
    header: () => <div className="text-center">Period</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span className="font-medium text-gray-900">{row.getValue('period')}</span>
      </div>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const title = row.original;

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(title.id)}>Copy ID</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(title.id)}>
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

export function TitlesTable() {
  const [tableData, setTableData] = useState<TitleCapstone[]>([
    {
      id: '1',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '2',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '3',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '4',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '5',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '6',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '7',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '8',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '9',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '10',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '11',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
    },
    {
      id: '12',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'inimahjokowi.pdf',
      period: 1,
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
        searchKey="judul"
        searchPlaceholder="Filter by judul..."
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
