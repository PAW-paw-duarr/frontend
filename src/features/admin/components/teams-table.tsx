import { useState } from 'react';
import { DataTable } from '../components/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { MoreHorizontal, Pencil } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import type { TeamCapstone } from './admin';

const createColumns = (onDelete: (id: string) => void): ColumnDef<TeamCapstone>[] => [
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
    accessorKey: 'nama',
    header: 'Nama',
    cell: ({ row }) => <div className="font-semibold text-gray-900">{row.getValue('nama')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'kategori',
    header: 'Kategori',
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.getValue('kategori')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'totalAnggota',
    header: () => <div className="text-center">Total Anggota</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span className="font-medium text-gray-900">{row.getValue('totalAnggota')}</span>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'ketua',
    header: 'Ketua',
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.getValue('ketua')}</div>,
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
      const team = row.original;

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(team.id)}>Copy team ID</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
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
  const [tableData, setTableData] = useState<TeamCapstone[]>([
    {
      id: '1',
      nama: 'Kelompok 1',
      kategori: 'Kategori 1',
      totalAnggota: 3,
      ketua: 'ketua1@mail.ugm.ac.id',
      period: 1,
    },
    {
      id: '2',
      nama: 'Kelompok 2',
      kategori: 'Kategori 2',
      totalAnggota: 4,
      ketua: 'ketua2@mail.ugm.ac.id',
      period: 1,
    },
    {
      id: '3',
      nama: 'Kelompok 3',
      kategori: 'Kategori 1',
      totalAnggota: 3,
      ketua: 'ketua3@mail.ugm.ac.id',
      period: 2,
    },
    {
      id: '4',
      nama: 'Kelompok 4',
      kategori: 'Kategori 3',
      totalAnggota: 5,
      ketua: 'ketua4@mail.ugm.ac.id',
      period: 1,
    },
    {
      id: '5',
      nama: 'Kelompok 5',
      kategori: 'Kategori 2',
      totalAnggota: 3,
      ketua: 'ketua5@mail.ugm.ac.id',
      period: 2,
    },
    {
      id: '6',
      nama: 'Kelompok 6',
      kategori: 'Kategori 1',
      totalAnggota: 4,
      ketua: 'ketua6@mail.ugm.ac.id',
      period: 3,
    },
    {
      id: '7',
      nama: 'Kelompok 7',
      kategori: 'Kategori 3',
      totalAnggota: 3,
      ketua: 'ketua7@mail.ugm.ac.id',
      period: 1,
    },
    {
      id: '8',
      nama: 'Kelompok 8',
      kategori: 'Kategori 2',
      totalAnggota: 5,
      ketua: 'ketua8@mail.ugm.ac.id',
      period: 2,
    },
    {
      id: '9',
      nama: 'Kelompok 9',
      kategori: 'Kategori 1',
      totalAnggota: 3,
      ketua: 'ketua9@mail.ugm.ac.id',
      period: 1,
    },
    {
      id: '10',
      nama: 'Kelompok 10',
      kategori: 'Kategori 3',
      totalAnggota: 4,
      ketua: 'ketua10@mail.ugm.ac.id',
      period: 2,
    },
    {
      id: '11',
      nama: 'Kelompok 11',
      kategori: 'Kategori 2',
      totalAnggota: 3,
      ketua: 'ketua11@mail.ugm.ac.id',
      period: 1,
    },
    {
      id: '12',
      nama: 'Kelompok 12',
      kategori: 'Kategori 1',
      totalAnggota: 5,
      ketua: 'ketua12@mail.ugm.ac.id',
      period: 3,
    },
  ]);

  const handleDelete = (id: string) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBulkDelete = (selectedIds: string[]) => {
    setTableData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
  };

  return (
    <div className="w-full space-y-4 px-12">
      <DataTable
        columns={createColumns(handleDelete)}
        data={tableData}
        searchKey="nama"
        searchPlaceholder="Filter by nama..."
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
