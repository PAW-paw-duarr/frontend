import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from 'src/components/ui/field';
import { Input } from 'src/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginWithEmailInputSchema, useLoginWithEmail } from '../../lib/api/auth';

export function LoginForm() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(LoginWithEmailInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const mutation = useLoginWithEmail();

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) => {
              mutation.mutate(data);
            })}
          >
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" placeholder="m@example.com" {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" loading={mutation.isPending}>
                  Login
                </Button>
                <Button variant="outline" type="button">
                  <a href="/api/auth/google">Login with Google</a>
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
