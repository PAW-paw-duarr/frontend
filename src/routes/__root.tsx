import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { getUserQueryOptions } from '~/lib/auth';
import type { components } from '~/lib/api-schema';
import { NotFound } from '~/components/section/NotFound';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: components['schemas']['data-user'] | null;
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      ...getUserQueryOptions(),
    });

    return { user };
  },
  component: RootComponent,
  notFoundComponent: () => {
    return <NotFound />;
  },
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
