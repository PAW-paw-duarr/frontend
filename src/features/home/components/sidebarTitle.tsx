import { Sheet, SheetContent, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Upload, Trash2, FileText } from 'lucide-react';
import { cn } from '~/lib/utils';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { HiExternalLink } from 'react-icons/hi';
import { useUploadFile } from '../hooks/useUploadFile';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { FILE_BASE_URL } from '~/lib/constant';
import { useQuery } from '@tanstack/react-query';
import { getTitleByIdQuery } from '~/lib/api/title';
import { getTeamByIdQuery } from '~/lib/api/team';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSubmissionSchema, useCreateSubmission } from '~/lib/api/submission';
import { useProfileDialogStore, useTitleSidebarStore } from '~/hooks/global';
import { ProfileOrangT } from '~/features/profile/components/profile-dialog-orang';
import { MemberTeam } from '~/components/list/member-team';

export function SidebarTitle() {
  const uploadFile = useUploadFile();
  const stateTitle = useTitleSidebarStore((state) => state.state);
  const setStateTitle = useTitleSidebarStore((state) => state.setState);

  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/t' });
  const titleId = searchParams?.t || '';
  const { data: dataTitle } = useQuery(getTitleByIdQuery(titleId));
  const { data: dataTeam } = useQuery(getTeamByIdQuery(dataTitle?.team_id || ''));
  const stateProfile = useProfileDialogStore((state) => state.state);
  const setStateProfile = useProfileDialogStore((state) => state.setState);

  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(createSubmissionSchema),
    defaultValues: {
      team_target_id: dataTeam?.id || '',
    },
  });
  const mutation = useCreateSubmission();

  function onClose() {
    if (mutation.isPending) return;
    navigate({
      to: '.',
      search: (old) => ({ ...old, t: undefined, p: undefined }),
      replace: true,
      resetScroll: false,
    });
    setStateTitle(false);
    setStateProfile(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  function toggleProfileDialog(profileId: string) {
    navigate({
      to: '.',
      search: (old) => ({ ...old, p: profileId }),
      replace: true,
      resetScroll: false,
    });
    setStateProfile(true);
  }

  if (!dataTitle || !dataTeam) {
    return null;
  }

  return (
    <>
      {stateProfile && <ProfileOrangT />}
      <Sheet open={stateTitle} onOpenChange={handleOpenChange}>
        <SheetContent
          side="right"
          className="border-primary w-full overflow-y-auto border-2 px-6 py-6 sm:max-w-xl sm:px-6 sm:py-8 md:max-w-2xl md:rounded-l-2xl md:px-10 lg:max-w-3xl lg:px-20 lg:py-12 [&>button]:hidden"
        >
          <SheetHeader className="justify-between border-b pb-3 sm:pb-4">
            <SheetTitle hidden>{dataTitle.title}</SheetTitle>
            <MdKeyboardDoubleArrowRight
              onClick={onClose}
              className="h-9 w-9 cursor-pointer rounded-full bg-gray-100 p-1.5 transition-colors hover:bg-gray-200 sm:h-11 sm:w-11 sm:p-2 md:h-[45px] md:w-[45px]"
            />
            <Badge
              variant="secondary"
              className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold italic sm:px-4 sm:py-1.5 sm:text-sm md:text-base lg:text-lg"
            >
              {dataTeam.category}
            </Badge>
          </SheetHeader>

          <form
            onSubmit={handleSubmit((data) => {
              if (!data.grand_design) return;

              const finalData = {
                ...data,
                team_target_id: dataTeam.id,
              };

              mutation.mutate(finalData);
            })}
          >
            <div className="space-y-4 py-4 sm:space-y-5 sm:py-5 md:space-y-6 md:py-6">
              <div>
                <h1 className="mb-2 text-xl leading-tight font-extrabold sm:mb-3 sm:text-2xl md:text-3xl md:leading-normal">
                  {dataTitle.title}
                </h1>

                <div>
                  <h3 className="mb-2 text-lg font-bold sm:text-xl md:text-2xl">Deskripsi</h3>
                  <p className="text-base leading-relaxed text-gray-600">{dataTitle.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1 text-base sm:pt-2">
                  <p className="">oleh</p>
                  <p className="font-semibold">{dataTeam.name}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl md:text-2xl">Anggota Tim</h3>
                <div className="flex w-fit flex-col items-start gap-2">
                  <MemberTeam
                    dataMember={dataTeam?.member || []}
                    leaderEmail={dataTeam?.leader_email}
                    toggleProfileDialog={toggleProfileDialog}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between sm:mb-3">
                  <h3 className="text-lg font-bold sm:text-xl md:text-2xl">Proposal</h3>
                  <a
                    href={FILE_BASE_URL + dataTitle.proposal_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-black p-1.5 text-white hover:bg-gray-800 hover:text-gray-200 sm:h-9 sm:w-9 sm:p-2 md:h-10 md:w-10"
                  >
                    <HiExternalLink className="h-full w-full" />
                  </a>
                </div>
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                  <iframe
                    src={FILE_BASE_URL + dataTitle.proposal_url}
                    className="h-full w-full border-0"
                    title="Proposal PDF Preview"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between sm:mb-3">
                  <h3 className="text-lg font-bold sm:text-xl md:text-2xl">Foto</h3>
                  <a
                    href={FILE_BASE_URL + dataTitle.photo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-black p-1.5 text-white hover:bg-gray-800 hover:text-gray-200 sm:h-9 sm:w-9 sm:p-2 md:h-10 md:w-10"
                  >
                    <HiExternalLink className="h-full w-full" />
                  </a>
                </div>
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={FILE_BASE_URL + dataTitle.photo_url}
                    alt="Foto Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="upload" className="rounded-lg border border-gray-200">
                    <AccordionTrigger className="px-3 hover:no-underline sm:px-4">
                      <span className="text-xs font-medium sm:text-sm">Ajukan Kelanjutan Capstone</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3 sm:px-4 sm:pb-4">
                      <Controller
                        name="grand_design"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-3 pt-2 sm:space-y-4">
                            <div
                              {...uploadFile.getRootProps()}
                              className={cn(
                                'flex cursor-pointer flex-col items-center space-y-2 rounded-lg border-2 border-dashed py-8 transition-colors sm:space-y-3 sm:py-12 md:py-16',
                                uploadFile.isDragActive
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-300 bg-white hover:bg-gray-50'
                              )}
                            >
                              <input
                                {...uploadFile.getInputProps()}
                                onChange={(e) => {
                                  uploadFile.getInputProps().onChange?.(e);
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    field.onChange(file);
                                    setValue('grand_design', file);
                                  }
                                }}
                              />
                              <div
                                className={cn(
                                  'rounded-full p-2.5 sm:p-3 md:p-4',
                                  uploadFile.isDragActive ? 'bg-blue-100' : 'bg-gray-100'
                                )}
                              >
                                <Upload
                                  className={cn(
                                    'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8',
                                    uploadFile.isDragActive ? 'text-blue-500' : 'text-gray-400'
                                  )}
                                />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-medium sm:text-sm">
                                  {uploadFile.isDragActive
                                    ? 'Lepaskan file di sini...'
                                    : 'Unggah Grand Design Tim Anda'}
                                </p>
                                <p className="mt-1 px-4 text-[10px] text-gray-500 sm:text-xs">
                                  {uploadFile.isDragActive ? (
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
                            {uploadFile.uploadedFile && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5 sm:px-4 sm:py-3">
                                  <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                                    <div className="rounded-md bg-gray-100 p-1.5 sm:p-2">
                                      <FileText className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
                                    </div>
                                    <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
                                      <button
                                        onClick={uploadFile.handleFileClick}
                                        className="cursor-pointer truncate text-left text-xs font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline sm:text-sm"
                                        title={uploadFile.uploadedFile.name}
                                      >
                                        {uploadFile.uploadedFile.name}
                                      </button>
                                      {uploadFile.uploadProgress === 100 && (
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
                                    onClick={() => {
                                      uploadFile.handleRemoveFile();
                                      field.onChange(undefined);
                                      setValue('grand_design', null);
                                    }}
                                  >
                                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  </Button>
                                </div>
                                <div className="space-y-1">
                                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 sm:h-2">
                                    <div
                                      className="h-full rounded-full bg-black transition-all duration-300"
                                      style={{ width: `${uploadFile.uploadProgress}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <Button
                className="w-full rounded-lg bg-black py-4 text-sm text-white hover:bg-gray-800 sm:py-5 sm:text-base md:py-6"
                loading={mutation.isPending}
              >
                Kirim Pengajuan
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
