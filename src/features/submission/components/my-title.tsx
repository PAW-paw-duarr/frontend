import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { useMyTitleDialogStore } from '~/hooks/global';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '~/components/ui/shadcn-io/dropzone';
import { toast } from 'sonner';
import { FileText, ExternalLink } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Field, FieldLabel, FieldError } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';
import { getTitleByIdQuery, updateTitleSchema, useUpdateTitle } from '~/lib/api/title';
import { getTeamByIdQuery } from '~/lib/api/team';
import { useEffect } from 'react';

export function MyTitle() {
  const stateMyTitle = useMyTitleDialogStore((state) => state.state);
  const setStateMyTitle = useMyTitleDialogStore((state) => state.setState);
  const { data: accountData } = useQuery(getCurrentUserQuery());
  const { data: teamData } = useQuery(getTeamByIdQuery(accountData?.team_id || ''));
  const { data: capstoneData } = useQuery(getTitleByIdQuery(teamData?.title_id || ''));

  const isLeader = accountData?.email === teamData?.leader_email;

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(updateTitleSchema),
    defaultValues: {
      title: '',
      desc: '',
      description: '',
      proposal_file: undefined,
      photo_file: undefined,
    },
  });

  useEffect(() => {
    if (capstoneData) {
      reset({
        title: capstoneData.title || '',
        desc: capstoneData.desc || '',
        description: capstoneData.description || '',
        proposal_file: undefined,
        photo_file: undefined,
      });
    }
  }, [capstoneData, reset]);

  const mutation = useUpdateTitle();

  const onSubmit = handleSubmit((data) => {
    if (!teamData?.title_id) {
      toast.error('Title ID not found');
      return;
    }

    mutation.mutate(data);
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStateMyTitle(false);
    }
  };

  if (!accountData) {
    return null;
  }

  return (
    <Dialog open={stateMyTitle} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Capstone Title</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input id="title" {...field} aria-invalid={fieldState.invalid} readOnly={!isLeader} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="desc"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="desc">Short Description</FieldLabel>
                <Input id="desc" {...field} aria-invalid={fieldState.invalid} readOnly={!isLeader} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Full Description</FieldLabel>
                <textarea
                  id="description"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  readOnly={!isLeader}
                  className="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="proposal_file"
            control={control}
            render={({ field: { onChange, value }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="proposal">Proposal File</FieldLabel>

                {capstoneData?.proposal_url && !value && (
                  <div className="mb-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">Current proposal uploaded</p>
                      <a
                        href={capstoneData.proposal_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 hover:underline"
                      >
                        View current proposal <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}

                <Dropzone
                  accept={{
                    'application/pdf': [],
                  }}
                  disabled={!isLeader}
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

          <Controller
            name="photo_file"
            control={control}
            render={({ field: { onChange, value }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="photo">Photo</FieldLabel>

                {capstoneData?.photo_url && !value && (
                  <div className="mb-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">Current photo uploaded</p>
                      <a
                        href={capstoneData.photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 hover:underline"
                      >
                        View current photo <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}

                <Dropzone
                  accept={{
                    'image/*': [],
                  }}
                  disabled={!isLeader}
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

          <div className="mt-4 flex justify-end gap-3 border-t border-gray-200 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStateMyTitle(false)}
              className="rounded-md px-4 py-2"
            >
              Cancel
            </Button>
            {isLeader && (
              <Button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
            {!isLeader && (
              <div className="flex items-center text-sm text-gray-600">
                <p>Only team leaders can edit this information</p>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
