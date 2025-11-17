import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from 'src/components/ui/field';
import { Input } from 'src/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { joinTeamSchema, useJoinTeam } from '~/lib/api/team';
import { useLogout } from '~/lib/api/auth';

export function JoinTeam() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(joinTeamSchema),
  });
  const mutation = useJoinTeam();
  const logoutMutation = useLogout();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Join Team</CardTitle>
          <CardDescription>Enter the team code to join your team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="teamCode">Team Code</FieldLabel>
                <Controller
                  name="code"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Input {...field} id="code" placeholder="Enter team code" required />
                      {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                    </>
                  )}
                />
                <FieldDescription>Enter the team code provided by your team leader.</FieldDescription>
              </Field>
              <FieldGroup>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? 'Joining...' : 'Join Team'}
                </Button>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-sm">
        Want to use a different account?{' '}
        <button
          type="button"
          onClick={() => logoutMutation.mutate()}
          className="hover:text-foreground underline underline-offset-4"
          disabled={logoutMutation.isPending}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
