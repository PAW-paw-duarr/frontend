import { createFileRoute } from '@tanstack/react-router'
import { Home } from '~/features/home/home'


export const Route = createFileRoute('/_auth/title')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Home />
    </>
  )
}
