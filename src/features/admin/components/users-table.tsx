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
import type { User } from './admin';

const createColumns = (onDelete: (id: string) => void, onDownload: (url: string) => void): ColumnDef<User>[] => [
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
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="text-sm text-gray-600">{row.getValue('email')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'tim',
    header: 'Tim',
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.getValue('tim')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.getValue('role')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'curriculumVitae',
    header: 'Curriculum Vitae',
    cell: ({ row }) => {
      const cv = row.getValue('curriculumVitae') as string;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">{cv}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDownload(`/uploads/cv/${cv}`)}
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
      const user = row.original;

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>Copy ID</DropdownMenuItem>
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Reset password</DropdownMenuItem>
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
  const [tableData, setTableData] = useState<User[]>([
    {
      id: '1',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '2',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'mimin',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '3',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '4',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '5',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '6',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '7',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '8',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '9',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '10',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '11',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
    },
    {
      id: '12',
      nama: 'Jhon dema',
      email: 'Jhon@gmail.com',
      tim: 'Kelompok1',
      role: 'user',
      curriculumVitae: 'inimahjokowi.pdf',
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
        searchKey="nama"
        searchPlaceholder="Filter by nama..."
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
