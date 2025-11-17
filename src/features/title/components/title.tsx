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
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllTitlesQuery } from '~/lib/api/title';
import { FILE_BASE_URL } from '~/lib/constant';
import { SidebarTitle } from './sidebarTitle';
import { useSearchTitles } from '../hooks/useSearchTitles';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useTitleSidebarStore } from '~/hooks/global';

export function Title() {
  const allData = useQuery(getAllTitlesQuery()).data || [];
  const searchParams = useSearch({ from: '/_auth/t' });
  const searchQuery = searchParams?.q || '';
  const navigate = useNavigate();

  const { search } = useSearchTitles(allData);
  const data = useMemo(() => search(searchQuery), [search, searchQuery]);

  const isOpen = searchParams?.t !== '' && searchParams?.t !== undefined;
  const stateTitle = useTitleSidebarStore((state) => state.state);
  const setStateTitle = useTitleSidebarStore((state) => state.setState);

  useEffect(() => {
    setStateTitle(isOpen);
  }, [isOpen, setStateTitle]);

  function toggleSidebar(titleId: string) {
    setStateTitle(false);
    navigate({
      to: '.',
      search: (old) => ({ ...old, t: titleId }),
      replace: true,
      resetScroll: false,
    });
    setStateTitle(true);
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
      {stateTitle && <SidebarTitle />}
      <section className="flex w-full flex-col gap-6 px-6 py-16 md:px-20 md:py-32 lg:px-24 xl:px-36">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-2">
            <h1 className="text-4xl leading-0 font-bold md:text-5xl lg:text-6xl">
              {data.length} Title {searchQuery && `for "${searchQuery}"`}
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
    </>
  );
}
