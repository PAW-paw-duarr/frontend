import { useState } from 'react';
import { DataTable } from './data-table';
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
import { DataTableColumnHeader } from './data-table-column';

// Type definition
export type TeamCapstone = {
  id: string;
  judul: string;
  deskripsi: string;
  photo: string;
  proposal: string;
  period: number;
};

// Column definitions dengan handler
const createColumns = (
  onDelete: (id: string) => void,
  onDownload: (url: string) => void
): ColumnDef<TeamCapstone>[] => [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Judul" />,
    cell: ({ row }) => <div className="font-semibold text-gray-900">{row.getValue('judul')}</div>,
  },
  {
    accessorKey: 'deskripsi',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deskripsi" />,
    cell: ({ row }) => {
      const deskripsi = row.getValue('deskripsi') as string;
      return <div className="max-w-[300px] truncate text-sm text-gray-600">{deskripsi}</div>;
    },
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
  },
  {
    accessorKey: 'period',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <DataTableColumnHeader column={column} title="Period" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span className="font-medium text-gray-900">{row.getValue('period')}</span>
      </div>
    ),
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
  },
];

export function Table() {
  // State untuk data - Tambah lebih banyak data untuk test pagination
  const [tableData, setTableData] = useState<TeamCapstone[]>([
    {
      id: '1',
      judul: 'Eco Tech',
      deskripsi: 'Smartbin untuk pengelolaan sampah pintar berbasis IoT',
      photo: 'Kelompok1.jpg',
      proposal: 'proposal_ecotech.pdf',
      period: 1,
    },
    {
      id: '2',
      judul: 'Health Monitor',
      deskripsi: 'Aplikasi monitoring kesehatan dengan AI dan machine learning',
      photo: 'team_health.jpg',
      proposal: 'health_proposal.pdf',
      period: 2,
    },
    {
      id: '3',
      judul: 'Smart Farming',
      deskripsi: 'Sistem pertanian pintar menggunakan sensor dan automation',
      photo: 'farm_team.jpg',
      proposal: 'farming_doc.pdf',
      period: 1,
    },
    {
      id: '4',
      judul: 'EduLearn Platform',
      deskripsi: 'Platform pembelajaran online interaktif untuk mahasiswa',
      photo: 'edulearn.jpg',
      proposal: 'edulearn_proposal.pdf',
      period: 3,
    },
    {
      id: '5',
      judul: 'Traffic Management',
      deskripsi: 'Sistem manajemen lalu lintas real-time berbasis computer vision',
      photo: 'traffic_team.jpg',
      proposal: 'traffic_analysis.pdf',
      period: 2,
    },
    {
      id: '6',
      judul: 'Food Delivery App',
      deskripsi: 'Aplikasi delivery makanan dengan fitur tracking dan rating',
      photo: 'foodapp.jpg',
      proposal: 'food_proposal.pdf',
      period: 1,
    },
    {
      id: '7',
      judul: 'Smart Home System',
      deskripsi: 'Sistem rumah pintar dengan kontrol otomatis dan voice assistant',
      photo: 'smarthome.jpg',
      proposal: 'smarthome_doc.pdf',
      period: 2,
    },
    {
      id: '8',
      judul: 'Blockchain Voting',
      deskripsi: 'Platform voting berbasis blockchain untuk keamanan maksimal',
      photo: 'voting_team.jpg',
      proposal: 'blockchain_proposal.pdf',
      period: 3,
    },
    {
      id: '9',
      judul: 'AR Museum Guide',
      deskripsi: 'Aplikasi museum guide menggunakan augmented reality',
      photo: 'ar_museum.jpg',
      proposal: 'ar_guide_doc.pdf',
      period: 1,
    },
    {
      id: '10',
      judul: 'FinTech Payment',
      deskripsi: 'Platform payment digital dengan fitur budgeting dan investasi',
      photo: 'fintech.jpg',
      proposal: 'payment_proposal.pdf',
      period: 2,
    },
    {
      id: '3',
      judul: 'Smart Farming',
      deskripsi: 'Sistem pertanian pintar menggunakan sensor dan automation',
      photo: 'farm_team.jpg',
      proposal: 'farming_doc.pdf',
      period: 1,
    },
    {
      id: '4',
      judul: 'EduLearn Platform',
      deskripsi: 'Platform pembelajaran online interaktif untuk mahasiswa',
      photo: 'edulearn.jpg',
      proposal: 'edulearn_proposal.pdf',
      period: 3,
    },
    {
      id: '5',
      judul: 'Traffic Management',
      deskripsi: 'Sistem manajemen lalu lintas real-time berbasis computer vision',
      photo: 'traffic_team.jpg',
      proposal: 'traffic_analysis.pdf',
      period: 2,
    },
    {
      id: '6',
      judul: 'Food Delivery App',
      deskripsi: 'Aplikasi delivery makanan dengan fitur tracking dan rating',
      photo: 'foodapp.jpg',
      proposal: 'food_proposal.pdf',
      period: 1,
    },
    {
      id: '7',
      judul: 'Smart Home System',
      deskripsi: 'Sistem rumah pintar dengan kontrol otomatis dan voice assistant',
      photo: 'smarthome.jpg',
      proposal: 'smarthome_doc.pdf',
      period: 2,
    },
    {
      id: '8',
      judul: 'Blockchain Voting',
      deskripsi: 'Platform voting berbasis blockchain untuk keamanan maksimal',
      photo: 'voting_team.jpg',
      proposal: 'blockchain_proposal.pdf',
      period: 3,
    },
    {
      id: '9',
      judul: 'AR Museum Guide',
      deskripsi: 'Aplikasi museum guide menggunakan augmented reality',
      photo: 'ar_museum.jpg',
      proposal: 'ar_guide_doc.pdf',
      period: 1,
    },
    {
      id: '10',
      judul: 'FinTech Payment',
      deskripsi: 'Platform payment digital dengan fitur budgeting dan investasi',
      photo: 'fintech.jpg',
      proposal: 'payment_proposal.pdf',
      period: 2,
    },
  ]);

  // Handler untuk delete
  const handleDelete = (id: string) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
  };

  // Handler untuk bulk delete
  const handleBulkDelete = (selectedIds: string[]) => {
    setTableData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
  };

  // Handler untuk download
  const handleDownload = (url: string) => {
    // Buka file di tab baru
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4 px-12">
      <DataTable
        columns={createColumns(handleDelete, handleDownload)}
        data={tableData}
        searchKey="judul"
        searchPlaceholder="Filter Nama..."
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
