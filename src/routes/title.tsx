import { createFileRoute } from '@tanstack/react-router'
import { SignupTitleForm } from '~/features/auth/signup-title-form'

export const Route = createFileRoute('/title')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-xl">
            <SignupTitleForm />
          </div>
        </div>
  );
}
