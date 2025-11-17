import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { SubmissionCard } from './submissionCard';
import { usePagination } from '~/features/home/hooks/usePagination';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllSubmissionQuery } from '~/lib/api/submission';
import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useSearchSubmissions } from '../hooks/useSearchSubmissions';
import { useMyTitleDialogStore } from '~/hooks/global';
import { MyTitle } from './my-title';

export function SubmissionSection() {
  const { data: submissionsData } = useSuspenseQuery(getAllSubmissionQuery());
  const searchParams = useSearch({ from: '/_auth/s' });
  const searchQuery = searchParams?.q || '';
  const stateMyTitle = useMyTitleDialogStore((state) => state.state);
  const setStateMyTitle = useMyTitleDialogStore((state) => state.setState);

  const { search } = useSearchSubmissions(submissionsData);
  const filteredData = useMemo(() => search(searchQuery), [search, searchQuery]);

  const {
    currentPage,
    totalPages,
    currentData,
    gridRef,
    handlePageChange,
    getPageNumbers,
    goToPreviousPage,
    goToNextPage,
    canGoPrevious,
    canGoNext,
  } = usePagination({
    data: filteredData,
    itemsPerPage: 6,
  });

  return (
    <>
      {stateMyTitle && <MyTitle />}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {filteredData.length} Team - Submitting Forward {searchQuery && `for "${searchQuery}"`}
          </h1>
          <Button
            className="rounded-lg bg-black py-4 text-sm text-white hover:bg-gray-800 sm:py-5 sm:text-base md:py-6"
            onClick={() => setStateMyTitle(true)}
            size={'lg'}
          >
            My Capstone
          </Button>
        </div>

        <div ref={gridRef} className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentData.map((submission) => (
            <button key={submission.id}>
              <SubmissionCard submissionId={submission.id} />
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousPage}
              disabled={!canGoPrevious}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-1">
              {getPageNumbers().map((page, i) => (
                <div key={i}>
                  {page === '...' ? (
                    <span className="px-2 py-1 text-gray-400">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => handlePageChange(page as number)}
                      className={currentPage === page ? 'bg-black text-white hover:bg-black/90' : ''}
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextPage}
              disabled={!canGoNext}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
