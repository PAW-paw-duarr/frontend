import * as React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { Badge } from '~/components/ui/badge';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { FileText, Clock, CheckCircle2, XCircle, Calendar, ChevronDown } from 'lucide-react';
import { cn } from '~/lib/utils';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';

interface Submission {
  id: string;
  title: string;
  groupName: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  fileName: string;
  fileSize: string;
  fileUrl: string;
  reviewNotes?: string;
}

interface SubmissionMeProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dummy data untuk contoh
const dummySubmissions: Submission[] = [
  {
    id: '1',
    title: 'SmartBin: Tempat Sampah Pintar',
    groupName: 'Tim EcoTech Innovators',
    submittedAt: '2024-11-15T10:30:00',
    status: 'approved',
    fileName: 'grand-design-smartbin.pdf',
    fileSize: '2.4 MB',
    fileUrl: '/files/grand-design-smartbin.pdf',
    reviewNotes: 'Proposal sudah bagus dan sesuai dengan guidelines.',
  },
  {
    id: '2',
    title: 'EduPlatform: Learning Management System',
    groupName: 'Tim Digital Learning',
    submittedAt: '2024-11-14T14:20:00',
    status: 'pending',
    fileName: 'proposal-eduplatform.pdf',
    fileSize: '1.8 MB',
    fileUrl: '/files/proposal-eduplatform.pdf',
  },
  {
    id: '3',
    title: 'HealthTracker: Medical Monitoring App',
    groupName: 'Tim MedTech Solutions',
    submittedAt: '2024-11-13T09:15:00',
    status: 'pending',
    fileName: 'design-healthtracker.pdf',
    fileSize: '3.2 MB',
    fileUrl: '/files/design-healthtracker.pdf',
  },
  {
    id: '4',
    title: 'FarmBot: IoT Agriculture System untuk Monitoring Tanaman dan Pertanian Modern',
    groupName: 'Tim AgriTech Innovation',
    submittedAt: '2024-11-12T16:45:00',
    status: 'rejected',
    fileName: 'proposal-farmbot.pdf',
    fileSize: '2.1 MB',
    fileUrl: '/files/proposal-farmbot.pdf',
    reviewNotes: 'Scope terlalu luas dan tidak realistis untuk timeline yang ditentukan.',
  },
];

export function SubmissionMe({ isOpen, onClose }: SubmissionMeProps) {
  const [submissions] = React.useState<Submission[]>(dummySubmissions);
  const [expandedItem, setExpandedItem] = React.useState<string | undefined>(undefined);

  const getStatusBadge = (status: Submission['status']) => {
    const statusConfig = {
      pending: {
        label: 'Menunggu Review',
        shortLabel: 'Menunggu',
        icon: Clock,
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      },
      approved: {
        label: 'Disetujui',
        shortLabel: 'Disetujui',
        icon: CheckCircle2,
        className: 'bg-green-100 text-green-800 border-green-200',
      },
      rejected: {
        label: 'Ditolak',
        shortLabel: 'Ditolak',
        icon: XCircle,
        className: 'bg-red-100 text-red-800 border-red-200',
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <>
        {/* Badge untuk mobile - hanya icon */}
        <Badge variant="outline" className={cn('flex-shrink-0 gap-1 p-1 sm:hidden', config.className)}>
          <Icon className="h-3 w-3" />
        </Badge>

        {/* Badge untuk desktop - icon + text */}
        <Badge variant="outline" className={cn('hidden flex-shrink-0 gap-1.5 sm:flex', config.className)}>
          <Icon className="h-3 w-3" />
          <span className="text-xs whitespace-nowrap">{config.label}</span>
        </Badge>
      </>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const truncateTitle = (title: string, wordLimit = 5) => {
    const words = title.split(' ');
    if (words.length <= wordLimit) return title;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const _ = (fileUrl: string) => {
    // Buka file PDF di tab baru
    window.open(fileUrl, '_blank');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="border-primary flex w-full flex-col overflow-hidden border-2 px-4 pt-6 sm:max-w-xl sm:px-6 sm:pt-8 md:max-w-2xl md:rounded-r-2xl md:px-10 [&>button]:hidden"
      >
        {/* Header */}
        <SheetHeader className="flex-shrink-0 space-y-3 pb-3 sm:space-y-4 sm:pb-4">
          <div className="flex w-full items-start justify-between gap-2 sm:gap-4">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <SheetTitle className="text-2xl font-bold sm:text-3xl md:text-4xl">Pengajuan Saya</SheetTitle>
              <Badge
                variant="secondary"
                className="w-fit bg-blue-100 px-3 py-1.5 text-xs text-blue-500 sm:px-4 sm:py-2 sm:text-sm"
              >
                {submissions.length} Pengajuan
              </Badge>
            </div>

            <MdKeyboardDoubleArrowLeft
              onClick={onClose}
              className="h-9 w-9 cursor-pointer rounded-full bg-gray-100 p-1.5 transition-colors hover:bg-gray-200 sm:h-11 sm:w-11 sm:p-2"
            />
          </div>
        </SheetHeader>

        <Separator className="mt-2 mb-4 flex-shrink-0 sm:mb-6" />

        {/* Content - dengan ScrollArea tanpa scrollbar */}
        <ScrollArea className="-mx-4 flex-1 px-4 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
          <div className="space-y-2.5 pb-6 sm:space-y-3">
            {submissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center sm:py-20">
                <FileText className="mb-3 h-16 w-16 text-gray-300 sm:mb-4 sm:h-20 sm:w-20" />
                <h3 className="mb-1.5 text-lg font-semibold text-gray-700 sm:mb-2 sm:text-xl">Belum Ada Pengajuan</h3>
                <p className="max-w-xs text-xs text-gray-500 sm:max-w-sm sm:text-sm">
                  Anda belum memiliki pengajuan capstone project. Mulai dengan mengajukan grand design tim Anda.
                </p>
              </div>
            ) : (
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-2.5 sm:space-y-3"
                value={expandedItem}
                onValueChange={setExpandedItem}
              >
                {submissions.map((submission) => {
                  const isExpanded = expandedItem === submission.id;
                  const displayTitle = isExpanded ? submission.title : truncateTitle(submission.title);

                  return (
                    <AccordionItem
                      key={submission.id}
                      value={submission.id}
                      className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white transition-all hover:shadow-md data-[state=open]:shadow-md sm:rounded-xl"
                    >
                      {/* Accordion Trigger - Header */}
                      <AccordionTrigger className="px-3 py-3 hover:no-underline sm:px-4 sm:py-4 [&>svg]:hidden">
                        <div className="flex w-full items-center justify-between gap-2 sm:gap-3">
                          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                            {/* Icon File */}
                            <div className="flex-shrink-0 rounded-md bg-gray-100 p-1.5 sm:p-2">
                              <FileText className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                            </div>

                            {/* Title & Group */}
                            <div className="min-w-0 flex-1 text-left">
                              <h3
                                className={cn(
                                  'mb-0.5 text-xs font-bold text-gray-900 sm:text-sm',
                                  !isExpanded && 'line-clamp-1'
                                )}
                              >
                                {displayTitle}
                              </h3>
                              <p className="line-clamp-1 text-[10px] text-gray-500 sm:text-xs">
                                {submission.groupName}
                              </p>
                            </div>
                          </div>

                          {/* Status Badge & Arrow */}
                          <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
                            {getStatusBadge(submission.status)}
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 flex-shrink-0 text-gray-500 transition-transform duration-200 sm:h-5 sm:w-5',
                                isExpanded && 'rotate-180'
                              )}
                            />
                          </div>
                        </div>
                      </AccordionTrigger>

                      {/* Accordion Content - Detail */}
                      <AccordionContent className="px-3 pb-3 sm:px-4 sm:pb-4">
                        <div className="space-y-3 pt-2 sm:space-y-4">
                          {/* File Info - Clickable */}
                          {/* <div

                            onClick={() => handleOpenFile(submission.fileUrl)}
                            className="cursor-pointer rounded-lg bg-gray-50 p-2.5 transition-colors hover:bg-gray-100 sm:p-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="line-clamp-1 text-xs font-medium text-blue-600 hover:underline sm:text-sm">
                                  {submission.fileName}
                                </p>
                                <p className="text-[10px] text-gray-500 sm:text-xs">{submission.fileSize}</p>
                              </div>
                            </div>
                          </div> */}

                          {/* Date Info */}
                          <div className="flex items-center gap-1.5 text-xs text-gray-600 sm:gap-2 sm:text-sm">
                            <Calendar className="h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                            <span className="text-[10px] sm:text-xs">
                              Diajukan pada {formatDate(submission.submittedAt)}
                            </span>
                          </div>

                          {/* Review Notes */}
                          {submission.reviewNotes && (
                            <div
                              className={cn(
                                'rounded-lg p-2.5 sm:p-3',
                                submission.status === 'approved' && 'border border-green-200 bg-green-50',
                                submission.status === 'rejected' && 'border border-red-200 bg-red-50'
                              )}
                            >
                              <p className="mb-1 text-[10px] font-semibold text-gray-600 uppercase sm:text-xs">
                                Catatan Review
                              </p>
                              <p className="text-[10px] leading-relaxed text-gray-700 sm:text-xs">
                                {submission.reviewNotes}
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
