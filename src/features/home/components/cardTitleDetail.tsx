import * as React from 'react';
import { Sheet, SheetContent, SheetHeader } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Upload, Trash2, Plus, FileText, Crown, User } from 'lucide-react';
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
  proposalFile,
  photos = [],
}: CardTitleDetailProps) {
  // Use custom hook
  const { uploadedFile, uploadProgress, isDragActive, getRootProps, getInputProps, handleRemoveFile, handleFileClick } =
    useTitleDetail();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="border-primary overflow-y-auto rounded-l-2xl border-2 px-20 py-12">
        {/* Header */}
        <SheetHeader className="justify-between border-b pb-4">
          <MdKeyboardDoubleArrowRight
            size={45}
            onClick={onClose}
            className="cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-gray-200"
          />
          <Badge variant="secondary" className="rounded-lg bg-blue-100 px-4 py-1.5 text-lg font-bold italic">
            {groupName} - {developedBy}
          </Badge>
        </SheetHeader>

        {/* Content */}
        <div className="space-y-6 py-6">
          {/* Title Section */}
          <div>
            <h1 className="mb-3 text-3xl leading-normal font-extrabold">{title}</h1>
            <div className="flex gap-1 pt-2 text-lg italic">
              <span className="font-medium">💡Dikembangkan oleh</span>
              <div className="font-bold">{developedBy}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-2xl font-bold">Deskripsi</h3>
            <p className="text-md leading-relaxed text-gray-600">{description}</p>
          </div>

          {/* Team Members - Pill Style */}
          <div>
            <h3 className="mb-3 text-2xl font-bold">Anggota Tim</h3>
            <div className="flex w-fit flex-col items-start gap-2">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition-all',
                    member.role === 'Ketua'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  )}
                >
                  {member.role === 'Ketua' ? (
                    <Crown className="h-6 w-6 flex-shrink-0" />
                  ) : (
                    <User className="h-6 w-6 flex-shrink-0" />
                  )}
                  <span>{member.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proposal Section */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Proposal</h3>
              <HiExternalLink className="h-10 w-10 cursor-pointer rounded-md bg-black p-2 text-white hover:bg-gray-800 hover:text-gray-200" />
            </div>
            <div className="aspect-video w-full rounded-lg bg-gray-200" />
          </div>

          {/* Photos Section */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Foto</h3>
              <HiExternalLink className="h-10 w-10 cursor-pointer rounded-md bg-black p-2 text-white hover:bg-gray-800 hover:text-gray-200" />
            </div>
            <div className="aspect-video w-full rounded-lg bg-gray-200" />
          </div>

          {/* Upload Section with Accordion & Dropzone */}
          <div className="space-y-3">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="upload" className="rounded-lg border border-gray-200">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-sm font-medium">Ajukan Kelanjutan Capston</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4 pt-2">
                    {/* Dropzone Upload Area */}
                    <div
                      {...getRootProps()}
                      className={cn(
                        'flex cursor-pointer flex-col items-center space-y-3 rounded-lg border-2 border-dashed py-16 transition-colors',
                        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'
                      )}
                    >
                      <input {...getInputProps()} />
                      <div className={cn('rounded-full p-4', isDragActive ? 'bg-blue-100' : 'bg-gray-100')}>
                        <Upload className={cn('h-8 w-8', isDragActive ? 'text-blue-500' : 'text-gray-400')} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          {isDragActive ? 'Lepaskan file di sini...' : 'Unggah Grand Design Tim Anda'}
                        </p>
                        <p className="mt-1 px-4 text-xs text-gray-500">
                          {isDragActive ? (
                            'Drop file untuk upload'
                          ) : (
                            <>
                              Kirimkan dokumen grand design sebagai referensi awal proyek tim Anda.
                              <br />
                              File akan digunakan untuk verifikasi dan dokumentasi Capstone.
                            </>
                          )}
                        </p>
                      </div>
                      <Button type="button" variant="outline" className="rounded-lg">
                        Unggah File
                      </Button>
                    </div>

                    {/* Uploaded File with Progress */}
                    {uploadedFile && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
                          <div className="flex min-w-0 flex-1 items-center gap-3">
                            <div className="rounded-md bg-gray-100 p-2">
                              <FileText className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex min-w-0 flex-1 items-center gap-2">
                              <button
                                onClick={handleFileClick}
                                className="cursor-pointer truncate text-left text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                                title={uploadedFile.name}
                              >
                                {uploadedFile.name}
                              </button>
                              {uploadProgress === 100 && (
                                <div className="flex-shrink-0 rounded-full bg-green-100 p-1">
                                  <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
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
                            className="h-8 w-8 flex-shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={handleRemoveFile}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
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
          <Button className="w-full rounded-lg bg-black py-6 text-white hover:bg-gray-800">Kirim Pengajuan</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
