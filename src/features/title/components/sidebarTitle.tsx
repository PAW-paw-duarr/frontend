import { Sheet, SheetContent, SheetHeader, SheetTitle } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { HiExternalLink } from 'react-icons/hi';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { FILE_BASE_URL } from '~/lib/constant';
import { useQuery } from '@tanstack/react-query';
import { getTitleByIdQuery } from '~/lib/api/title';
import { getTeamByIdQuery } from '~/lib/api/team';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSubmissionSchema, useCreateSubmission } from '~/lib/api/submission';
import { useProfileDialogStore, useTitleSidebarStore } from '~/hooks/global';
import { ProfileOrangT } from '~/features/profile/profile-dialog-orang';
import { MemberTeam } from '~/components/list/member-team';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Info } from 'lucide-react';
import { toast } from 'sonner';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '~/components/ui/shadcn-io/dropzone';
import { Field, FieldLabel, FieldError, FieldDescription } from '~/components/ui/field';

export function SidebarTitle() {
  const stateTitle = useTitleSidebarStore((state) => state.state);
  const setStateTitle = useTitleSidebarStore((state) => state.setState);

  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/_auth/t' });
  const titleId = searchParams?.t || '';
  const { data: dataTitle } = useQuery(getTitleByIdQuery(titleId));
  const { data: dataTeam } = useQuery(getTeamByIdQuery(dataTitle?.team_id || ''));
  const stateProfile = useProfileDialogStore((state) => state.state);
  const setStateProfile = useProfileDialogStore((state) => state.setState);

  const { handleSubmit, control } = useForm({
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
            <div className="mt-4 flex items-center gap-3">
              <Badge
                variant="secondary"
                className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold italic sm:px-4 sm:py-1.5 sm:text-sm md:text-base lg:text-lg"
              >
                {dataTeam.category}
              </Badge>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100">
                    <Info className="h-4 w-4 text-gray-500 sm:h-5 sm:w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 text-sm">
                  <p className="mb-1 font-semibold">About Proposals</p>
                  <p className="text-gray-600">
                    Team proposals will only be visible after your team is accepted for Capstone continuation.
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </SheetHeader>

          <form
            onSubmit={handleSubmit((data) => {
              if (!data.grand_design) {
                toast.error('Please upload a Grand Design file');
                return;
              }

              const finalData = {
                ...data,
                team_target_id: dataTeam.id,
              };

              toast.promise(mutation.mutateAsync(finalData), {
                loading: 'Submitting application...',
                success: 'Application submitted successfully!',
                error: 'Failed to submit application',
              });
            })}
          >
            <div className="space-y-4 py-4 sm:space-y-5 sm:py-5 md:space-y-6 md:py-6">
              <div>
                <h1 className="text-xl leading-tight font-extrabold sm:text-2xl md:text-3xl md:leading-normal">
                  {dataTitle.title}
                </h1>

                <div>
                  <h3 className="mb-2 text-lg font-bold sm:text-xl md:text-2xl">Description</h3>
                  <p className="text-base leading-relaxed text-gray-600">{dataTitle.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1 text-base sm:pt-2">
                  <p className="">by</p>
                  <p className="font-semibold">{dataTeam.name}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl md:text-2xl">Team Members</h3>
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
                  <h3 className="text-lg font-bold sm:text-xl md:text-2xl">Photo</h3>
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
                  <img src={FILE_BASE_URL + dataTitle.photo_url} alt="Preview" className="h-full w-full object-cover" />
                </div>
              </div>

              {dataTitle.proposal_url && (
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
              )}

              <div className="space-y-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="upload" className="rounded-lg border border-gray-200">
                    <AccordionTrigger className="px-3 hover:no-underline sm:px-4">
                      <span className="text-xs font-medium sm:text-sm">Apply for Capstone Continuation</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3 sm:px-4 sm:pb-4">
                      <Controller
                        name="grand_design"
                        control={control}
                        render={({ field: { onChange, value }, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="proposal file">Proposal Document</FieldLabel>
                            <FieldDescription>
                              Submit the grand design document as an initial reference for your team&apos;s project. The
                              file will be used for Capstone verification and documentation.
                            </FieldDescription>
                            <Dropzone
                              accept={{
                                'application/pdf': [],
                              }}
                              onDrop={(acceptedFiles) => {
                                onChange(acceptedFiles[0]);
                              }}
                              onError={(error) => {
                                toast.error(`File upload error: ${error.message}`);
                              }}
                              src={value ? [value] : undefined}
                              maxFiles={1}
                            >
                              <DropzoneEmptyState />

                              <DropzoneContent />
                            </Dropzone>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <Button
                className="w-full rounded-lg bg-black py-4 text-sm text-white hover:bg-gray-800 sm:py-5 sm:text-base md:py-6"
                loading={mutation.isPending}
                type="submit"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
