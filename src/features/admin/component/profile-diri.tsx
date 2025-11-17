import { Input } from '~/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserQuery, updateMyProfileSchema, useUpdateMyProfile } from '~/lib/api/user';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldLabel } from '~/components/ui/field';
import { Button } from '~/components/ui/button';

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
