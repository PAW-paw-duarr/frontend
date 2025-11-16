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
import { useEffect, useState, useMemo } from 'react';
import { SubmissionMe } from './submissionMe';
import { useQuery } from '@tanstack/react-query';
import { getAllTitlesQuery } from '~/lib/api/title';
import { FILE_BASE_URL } from '~/lib/constant';
import { SidebarTitle } from './sidebarTitle';
import { useHash } from '@mantine/hooks';
import { useSearchTitles } from '../hooks/useSearchTitles';
import { useSearch } from '@tanstack/react-router';

export function Title() {
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const allData = useQuery(getAllTitlesQuery()).data || [];
  const searchParams = useSearch({ from: '/_auth/' });
  const searchQuery = searchParams?.q || '';

  const { search } = useSearchTitles(allData);
  const data = useMemo(() => search(searchQuery), [search, searchQuery]);

  const [hash, setHash] = useHash();
  const isOpen = hash.startsWith('#title/');
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  function toggleSidebar(titleId: string) {
    setOpen(false);
    setHash(`#title/${titleId}`);
    setOpen(true);
  }

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
      {open && <SidebarTitle opens={open} setOpens={setOpen} />}
      <section className="flex w-full flex-col gap-6 px-6 py-16 md:px-20 md:py-32 lg:px-24 xl:px-36">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-2">
            <h1 className="text-4xl leading-0 font-bold md:text-5xl lg:text-6xl">
              {data.length} Judul {searchQuery && `untuk "${searchQuery}"`}
            </h1>
            <span className="hidden text-4xl font-semibold md:inline">-</span>
            <p className="text-2xl font-semibold md:text-3xl lg:text-4xl">Capstone Project</p>
          </div>
        </div>

        <hr className="border-t-2 border-gray-300" />

        <div ref={gridRef} className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {currentData.map((item, index) => (
            <Card key={startIndex + index} className="w-full">
              <CardHeader src={FILE_BASE_URL + item.photo_url} alt={item.title} />
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
              <CardFooter onClick={() => toggleSidebar(item.id)} />
            </Card>
          ))}
        </div>

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
