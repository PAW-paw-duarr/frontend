import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { SubmissionCard } from './submissionCard';
import { usePagination } from '~/features/home/hooks/usePagination';
import type { Submission } from '~/features/submission/hooks/useSubmission';

interface SubmissionSectionProps {
  submissions: Submission[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function SubmissionSection({ 
  submissions, 
  onAccept, 
  onReject 
}: SubmissionSectionProps) {
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
    data: submissions,
    itemsPerPage: 6,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">8 Tim - Mengajukan Penerusan</h1>
        <Button className="bg-black text-white hover:bg-black/90">
          Casptone saya
        </Button>
      </div>

      <div
        ref={gridRef}
        className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {currentData.map(submission => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
            onAccept={onAccept}
            onReject={onReject}
          />
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
            Sebelumnya
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
                    className={
                      currentPage === page
                        ? 'bg-black text-white hover:bg-black/90'
                        : ''
                    }
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
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}