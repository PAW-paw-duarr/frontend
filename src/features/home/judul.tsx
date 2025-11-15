import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '~/components/ui/cardTitle';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';

const data = [
  {
    judul: 'Sistem Informasi Manajemen Proyek',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah aplikasi web untuk membantu tim dalam mengelola proyek, termasuk penjadwalan tugas, pelacakan kemajuan, dan kolaborasi antar anggota tim.',
    ketua: 'Ketua1',
    email: 'ketua1@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Aplikasi E-Commerce untuk Produk Lokal',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Platform e-commerce yang fokus pada penjualan produk-produk lokal, memberikan kesempatan bagi pelaku usaha kecil untuk memperluas jangkauan pasar mereka.',
    ketua: 'Ketua2',
    email: 'ketua2@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Sistem Rekomendasi Buku Berbasis Machine Learning',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Aplikasi yang menggunakan algoritma machine learning untuk memberikan rekomendasi buku kepada pengguna berdasarkan preferensi dan riwayat bacaan mereka.',
    ketua: 'Ketua3',
    email: 'ketua3@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Platform Pembelajaran Online Interaktif',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah platform pembelajaran online yang menyediakan konten interaktif, kuis, dan forum diskusi untuk meningkatkan pengalaman belajar siswa.',
    ketua: 'Ketua4',
    email: 'ketua4@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Sistem Informasi Manajemen Proyek',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah aplikasi web untuk membantu tim dalam mengelola proyek, termasuk penjadwalan tugas, pelacakan kemajuan, dan kolaborasi antar anggota tim.',
    ketua: 'Ketua1',
    email: 'ketua1@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Aplikasi E-Commerce untuk Produk Lokal',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Platform e-commerce yang fokus pada penjualan produk-produk lokal, memberikan kesempatan bagi pelaku usaha kecil untuk memperluas jangkauan pasar mereka.',
    ketua: 'Ketua2',
    email: 'ketua2@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Sistem Rekomendasi Buku Berbasis Machine Learning',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Aplikasi yang menggunakan algoritma machine learning untuk memberikan rekomendasi buku kepada pengguna berdasarkan preferensi dan riwayat bacaan mereka.',
    ketua: 'Ketua3',
    email: 'ketua3@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Platform Pembelajaran Online Interaktif',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah platform pembelajaran online yang menyediakan konten interaktif, kuis, dan forum diskusi untuk meningkatkan pengalaman belajar siswa.',
    ketua: 'Ketua4',
    email: 'ketua4@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Sistem Rekomendasi Buku Berbasis Machine Learning',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Aplikasi yang menggunakan algoritma machine learning untuk memberikan rekomendasi buku kepada pengguna berdasarkan preferensi dan riwayat bacaan mereka.',
    ketua: 'Ketua3',
    email: 'ketua3@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Platform Pembelajaran Online Interaktif',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah platform pembelajaran online yang menyediakan konten interaktif, kuis, dan forum diskusi untuk meningkatkan pengalaman belajar siswa.',
    ketua: 'Ketua4',
    email: 'ketua4@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Sistem Rekomendasi Buku Berbasis Machine Learning',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Aplikasi yang menggunakan algoritma machine learning untuk memberikan rekomendasi buku kepada pengguna berdasarkan preferensi dan riwayat bacaan mereka.',
    ketua: 'Ketua3',
    email: 'ketua3@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Platform Pembelajaran Online Interaktif',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah platform pembelajaran online yang menyediakan konten interaktif, kuis, dan forum diskusi untuk meningkatkan pengalaman belajar siswa.',
    ketua: 'Ketua4',
    email: 'ketua4@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Platform Pembelajaran Online Interaktif',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah platform pembelajaran online yang menyediakan konten interaktif, kuis, dan forum diskusi untuk meningkatkan pengalaman belajar siswa.',
    ketua: 'Ketua4',
    email: 'ketua4@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Sistem Rekomendasi Buku Berbasis Machine Learning',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Aplikasi yang menggunakan algoritma machine learning untuk memberikan rekomendasi buku kepada pengguna berdasarkan preferensi dan riwayat bacaan mereka.',
    ketua: 'Ketua3',
    email: 'ketua3@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Platform Pembelajaran Online Interaktif',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah platform pembelajaran online yang menyediakan konten interaktif, kuis, dan forum diskusi untuk meningkatkan pengalaman belajar siswa.',
    ketua: 'Ketua4',
    email: 'ketua4@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Sistem Rekomendasi Buku Berbasis Machine Learning',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Aplikasi yang menggunakan algoritma machine learning untuk memberikan rekomendasi buku kepada pengguna berdasarkan preferensi dan riwayat bacaan mereka.',
    ketua: 'Ketua3',
    email: 'ketua3@gmail.com',
    avatar: '/logo.svg',
  },
  {
    judul: 'Platform Pembelajaran Online Interaktif',
    gambar: '/foto_capstone.png',
    deskripsi:
      'Sebuah platform pembelajaran online yang menyediakan konten interaktif, kuis, dan forum diskusi untuk meningkatkan pengalaman belajar siswa.',
    ketua: 'Ketua4',
    email: 'ketua4@gmail.com',
    avatar: '/logo.svg',
  },
];

export function TItleSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Ambil data untuk halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Handler untuk ganti halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate array nomor halaman
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-[50px] md:px-16 lg:px-[100px]">
      {/* Header Section Judul */}
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <h1 className="text-4xl leading-0 font-bold md:text-5xl lg:text-6xl">{data.length} Judul</h1>
          <span className="hidden text-4xl font-semibold md:inline">-</span>
          <p className="text-2xl font-semibold md:text-3xl lg:text-4xl">Capstone Project</p>
        </div>
        <Button size={'lg'} className="rounded-[12px] py-6 text-[16px]">
          Pengajuan Saya
        </Button>
      </div>

      {/* Lines */}
      <hr className="border-t-2 border-gray-300" />

      {/* Card Grid - 5 data per halaman */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentData.map((item, index) => (
          <Card key={startIndex + index} className="w-full">
            <CardHeader src={item.gambar} alt={item.judul} />
            <CardContent>
              <CardTitle>{item.judul}</CardTitle>
              <CardDescription>{item.deskripsi}</CardDescription>
            </CardContent>
            <CardFooter avatarSrc={item.avatar} userName={item.ketua} userEmail={item.email} />
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page as number)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
