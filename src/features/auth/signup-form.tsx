import { useForm, Controller } from 'react-hook-form';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from 'src/components/ui/field';
import { Input } from 'src/components/ui/input';
import { SignUpWithEmailInputSchema, useSignUpWithEmail } from './api-auth';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignupForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpWithEmailInputSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const mutation = useSignUpWithEmail();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate(data);
          })}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} id="name" type="text" placeholder="John Doe" />}
              />
              {errors.name && <FieldDescription className="text-red-500">{errors.name.message}</FieldDescription>}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} id="email" type="email" placeholder="m@example.com" />}
              />
              {errors.email && <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input {...field} id="password" type="password" />}
              />
              <FieldDescription>
                Must be at least 8 characters long and include uppercase, lowercase, number, and special character.
              </FieldDescription>
              {errors.password && (
                <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => <Input {...field} id="confirm-password" type="password" />}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
              {errors.confirmPassword && (
                <FieldDescription className="text-red-500">{errors.confirmPassword.message}</FieldDescription>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <Button variant="outline" type="button">
                  <a href="/api/auth/google">Sign up with Google</a>
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
