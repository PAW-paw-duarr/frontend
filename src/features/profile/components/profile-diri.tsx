import { DropzoneContent, DropzoneEmptyState, Dropzone } from '~/components/ui/shadcn-io/dropzone';
import { Input } from '~/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery, updateMyProfileSchema, useUpdateMyProfile } from '~/lib/api/user';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '~/components/ui/field';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';

export function ProfileDiri() {
  const { data: accountData } = useQuery(getCurrentUserQuery());

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(updateMyProfileSchema),
    defaultValues: {
      password: '',
      name: accountData?.name || '',
    },
  });
  const mutation = useUpdateMyProfile();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  if (!accountData) {
    return null;
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" value={accountData.email} readOnly />
        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
      </Field>

      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="Name">Name</FieldLabel>
            <Input id="Name" {...field} aria-invalid={fieldState.invalid} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="Password">Password</FieldLabel>
            <Input
              id="Password"
              type="password"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Leave blank to keep current password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="Confirm Password">Confirm Password</FieldLabel>
            <Input
              id="Confirm Password"
              type="password"
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Confirm new password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="cv_file"
        control={control}
        render={({ field: { onChange, value }, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="cv">Upload CV</FieldLabel>

            {accountData.cv_url && !value && (
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
                <FileText className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">Current CV uploaded</p>
                  <a
                    href={accountData.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 hover:underline"
                  >
                    View current CV <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

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

      <div className="mt-4 flex justify-end gap-3 border-t border-gray-200 pt-4">
        <Button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          loading={mutation.isPending}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
