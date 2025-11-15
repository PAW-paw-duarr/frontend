import { useState, useRef } from 'react';
import type { RefObject } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  startIndex: number;
  endIndex: number;
  gridRef: RefObject<HTMLDivElement>;
  handlePageChange: (page: number) => void;
  getPageNumbers: () => (number | string)[];
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function usePagination<T>({ data, itemsPerPage }: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Ambil data untuk halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Check navigation availability
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Scroll to grid helper
  const scrollToGrid = () => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler untuk ganti halaman
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    scrollToGrid();
  };

  // Navigation helpers
  const goToPreviousPage = () => handlePageChange(currentPage - 1);
  const goToNextPage = () => handlePageChange(currentPage + 1);

  // Generate array nomor halaman
  const getPageNumbers = (): (number | string)[] => {
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

  return {
    currentPage,
    totalPages,
    currentData,
    startIndex,
    endIndex,
    gridRef: gridRef as RefObject<HTMLDivElement>,
    handlePageChange,
    getPageNumbers,
    goToPreviousPage,
    goToNextPage,
    canGoPrevious,
    canGoNext,
  };
}
