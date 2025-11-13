import { createFileRoute } from '@tanstack/react-router'
import Navigation from '~/components/ui/custom/navigation'

export const Route = createFileRoute('/title')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Navigation />
  )
}
