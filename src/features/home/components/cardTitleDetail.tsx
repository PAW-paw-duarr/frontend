import { Sheet, SheetContent, SheetHeader } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Upload, Trash2, FileText, Crown, User } from 'lucide-react';
import { cn } from '~/lib/utils';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { HiExternalLink } from 'react-icons/hi';
import { useTitleDetail } from '../hooks/useTItleDetail';

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

interface CardTitleDetailProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  title: string;
  description: string;
  developedBy?: string;
  teamMembers?: TeamMember[];
  proposalFile?: string;
  photos?: string[];
}

export function CardTitleDetail({
  isOpen,
  onClose,
  groupName,
  title,
  description,
  developedBy = 'Tim EcoTech Innovators',
  teamMembers = [],
}: CardTitleDetailProps) {
  // Use custom hook
  const { uploadedFile, uploadProgress, isDragActive, getRootProps, getInputProps, handleRemoveFile, handleFileClick } =
    useTitleDetail();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="border-primary w-full overflow-y-auto border-2 px-6 py-6 sm:max-w-xl sm:px-6 sm:py-8 md:max-w-2xl md:rounded-l-2xl md:px-10 lg:max-w-3xl lg:px-20 lg:py-12 [&>button]:hidden"
      >
        {/* Header */}
        <SheetHeader className="justify-between border-b pb-3 sm:pb-4">
          <MdKeyboardDoubleArrowRight
            onClick={onClose}
            className="h-9 w-9 cursor-pointer rounded-full bg-gray-100 p-1.5 transition-colors hover:bg-gray-200 sm:h-11 sm:w-11 sm:p-2 md:h-[45px] md:w-[45px]"
          />
          <Badge
            variant="secondary"
            className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold italic sm:px-4 sm:py-1.5 sm:text-sm md:text-base lg:text-lg"
          >
            {groupName} - {developedBy}
          </Badge>
        </SheetHeader>

        {/* Content */}
        <div className="space-y-4 py-4 sm:space-y-5 sm:py-5 md:space-y-6 md:py-6">
          {/* Title Section */}
          <div>
            <h1 className="mb-2 text-xl leading-tight font-extrabold sm:mb-3 sm:text-2xl md:text-3xl md:leading-normal">
              {title}
            </h1>
            <div className="flex flex-wrap gap-1 pt-1 text-sm italic sm:pt-2 sm:text-base md:text-lg">
              <span className="font-medium">💡Dikembangkan oleh</span>
              <div className="font-bold">{developedBy}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-lg font-bold sm:text-xl md:text-2xl">Deskripsi</h3>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{description}</p>
          </div>

          {/* Team Members - Pill Style */}
          <div>
            <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl md:text-2xl">Anggota Tim</h3>
            <div className="flex w-fit flex-col items-start gap-2">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-all sm:w-auto sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base',
                    member.role === 'Ketua'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  )}
                >
                  {member.role === 'Ketua' ? (
                    <Crown className="h-4 w-4 shrink-0 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  ) : (
                    <User className="h-4 w-4 shrink-0 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  )}
                  <span className="truncate">{member.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proposal Section */}
          <div>
            <div className="mb-2 flex items-center justify-between sm:mb-3">
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl">Proposal</h3>
              <HiExternalLink className="h-8 w-8 cursor-pointer rounded-md bg-black p-1.5 text-white hover:bg-gray-800 hover:text-gray-200 sm:h-9 sm:w-9 sm:p-2 md:h-10 md:w-10" />
            </div>
            <div className="aspect-video w-full rounded-lg bg-gray-200" />
          </div>

          {/* Photos Section */}
          <div>
            <div className="mb-2 flex items-center justify-between sm:mb-3">
              <h3 className="text-lg font-bold sm:text-xl md:text-2xl">Foto</h3>
              <HiExternalLink className="h-8 w-8 cursor-pointer rounded-md bg-black p-1.5 text-white hover:bg-gray-800 hover:text-gray-200 sm:h-9 sm:w-9 sm:p-2 md:h-10 md:w-10" />
            </div>
            <div className="aspect-video w-full rounded-lg bg-gray-200" />
          </div>

          {/* Upload Section with Accordion & Dropzone */}
          <div className="space-y-3">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="upload" className="rounded-lg border border-gray-200">
                <AccordionTrigger className="px-3 hover:no-underline sm:px-4">
                  <span className="text-xs font-medium sm:text-sm">Ajukan Kelanjutan Capstone</span>
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <div className="space-y-3 pt-2 sm:space-y-4">
                    {/* Dropzone Upload Area */}
                    <div
                      {...getRootProps()}
                      className={cn(
                        'flex cursor-pointer flex-col items-center space-y-2 rounded-lg border-2 border-dashed py-8 transition-colors sm:space-y-3 sm:py-12 md:py-16',
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'
                      )}
                    >
                      <input {...getInputProps()} />
                      <div
                        className={cn('rounded-full p-2.5 sm:p-3 md:p-4', isDragActive ? 'bg-blue-100' : 'bg-gray-100')}
                      >
                        <Upload
                          className={cn(
                            'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8',
                            isDragActive ? 'text-blue-500' : 'text-gray-400'
                          )}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium sm:text-sm">
                          {isDragActive ? 'Lepaskan file di sini...' : 'Unggah Grand Design Tim Anda'}
                        </p>
                        <p className="mt-1 px-4 text-[10px] text-gray-500 sm:text-xs">
                          {isDragActive ? (
                            'Drop file untuk upload'
                          ) : (
                            <>
                              Kirimkan dokumen grand design sebagai referensi awal proyek tim Anda.
                              <br className="hidden sm:block" />
                              File akan digunakan untuk verifikasi dan dokumentasi Capstone.
                            </>
                          )}
                        </p>
                      </div>
                      <Button type="button" variant="outline" className="rounded-lg text-xs sm:text-sm">
                        Unggah File
                      </Button>
                    </div>

                    {/* Uploaded File with Progress */}
                    {uploadedFile && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
                          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                            <div className="rounded-md bg-gray-100 p-1.5 sm:p-2">
                              <FileText className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
                            </div>
                            <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
                              <button
                                onClick={handleFileClick}
                                className="cursor-pointer truncate text-left text-xs font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline sm:text-sm"
                                title={uploadedFile.name}
                              >
                                {uploadedFile.name}
                              </button>
                              {uploadProgress === 100 && (
                                <div className="shrink-0 rounded-full bg-green-100 p-0.5 sm:p-1">
                                  <svg
                                    className="h-2.5 w-2.5 text-green-600 sm:h-3 sm:w-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600 sm:h-8 sm:w-8"
                            onClick={handleRemoveFile}
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 sm:h-2">
                            <div
                              className="h-full rounded-full bg-black transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Submit Button */}
          <Button className="w-full rounded-lg bg-black py-4 text-sm text-white hover:bg-gray-800 sm:py-5 sm:text-base md:py-6">
            Kirim Pengajuan
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
