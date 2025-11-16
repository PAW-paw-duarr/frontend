import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './cardTitle';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';
import { usePagination } from '../hooks/usePagination';
import { CardTitleDetail } from './cardTitleDetail';
import { useState } from 'react';
import { SubmissionMe } from './submissionMe';
import { MdOutlineSaveAs } from 'react-icons/md';

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

export function TitleSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);

  const {
    currentPage,
    totalPages,
    currentData,
    startIndex,
    gridRef,
    handlePageChange,
    getPageNumbers,
    goToPreviousPage,
    goToNextPage,
    canGoPrevious,
    canGoNext,
  } = usePagination({
    data,
    itemsPerPage: 12,
  });

  return (
    <>
      <section className="flex w-full flex-col gap-6 px-6 py-16 md:px-20 md:py-32 lg:px-24 xl:px-36">
        {/* Header Section Judul */}
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-2">
            <h1 className="text-4xl leading-0 font-bold md:text-5xl lg:text-6xl">{data.length} Judul</h1>
            <span className="hidden text-4xl font-semibold md:inline">-</span>
            <p className="text-2xl font-semibold md:text-3xl lg:text-4xl">Capstone Project</p>
          </div>
          <Button
            onClick={() => setIsSubmissionOpen(true)}
            size={'lg'}
            className="hidden rounded-[12px] py-6 text-[16px] md:flex"
          >
            Pengajuan Saya
          </Button>
          <MdOutlineSaveAs
            className="bg-primary text-secondary cursor-pointer rounded-lg p-2.5 md:hidden"
            onClick={() => setIsSubmissionOpen(true)}
            size={50}
          />
        </div>

        {/* Lines */}
        <hr className="border-t-2 border-gray-300" />

        {/* Card Grid */}
        <div ref={gridRef} className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {currentData.map((item, index) => (
            <Card key={startIndex + index} className="w-full">
              <CardHeader src={item.gambar} alt={item.judul} />
              <CardContent>
                <CardTitle>{item.judul}</CardTitle>
                <CardDescription>{item.deskripsi}</CardDescription>
              </CardContent>
              <CardFooter
                avatarSrc={item.avatar}
                userName={item.ketua}
                userEmail={item.email}
                onClick={() => setSelectedCard(startIndex + index)}
              />
            </Card>
          ))}
        </div>

        {/* Detail Sidebar */}
        <CardTitleDetail
          isOpen={selectedCard !== null}
          onClose={() => setSelectedCard(null)}
          groupName="SmartBin"
          title="SmartBin: Tempat Sampah Pintar Berbasis IoT untuk Pemantauan Volume dan Pengelolaan Sampah Kampus."
          description="SmartBin adalah sistem tempat sampah pintar yang memanfaatkan sensor ultrasonik dan modul Wi-Fi untuk memantau volume sampah secara real-time. Data dikirm ke dashboard web untuk memudahkan petugas kebersihan mengetahui kapan tempat sampah perlu dikosongkan, sehingga meningkatkan efisiensi pengelolaan limbah dengan pengelolaan limbah yang lebih efektif dan berkelanjutan."
          developedBy="Tim EcoTech Innovators"
          teamMembers={[
            { name: 'Ketua Kelompoknya Jokowi', role: 'Ketua', avatar: '/logo.svg' },
            { name: 'Anggota 1 (Bahrul)', role: 'Anggota', avatar: '/logo.svg' },
            { name: 'Anggota 2 (Aman)', role: 'Anggota', avatar: '/logo.svg' },
            { name: 'Anggota 3 (FitriFatrla)', role: 'Anggota', avatar: '/logo.svg' },
          ]}
          proposalFile="Proposal.odf"
          photos={[]}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  className={!canGoPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
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
                  onClick={goToNextPage}
                  className={!canGoNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>

      {/* Submission Sidebar */}
      <SubmissionMe isOpen={isSubmissionOpen} onClose={() => setIsSubmissionOpen(false)} />
    </>
  );
}
