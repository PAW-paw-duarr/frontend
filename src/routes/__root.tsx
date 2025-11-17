import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { getCurrentUserQuery } from '~/lib/api/user';
import type { components } from '~/lib/api-schema';
import { NotFound } from '~/components/section/NotFound';
import { Toaster } from 'sonner';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: components['schemas']['data-user'] | null;
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      ...getCurrentUserQuery(),
    });

    return { user };
  },
  component: RootComponent,
  notFoundComponent: () => {
    return <NotFound />;
  },
  head: () => ({
    meta: [
      {
        title: 'ReCapstone',
      },
      {
        name: 'description',
        content:
          'The official platform for documentation, collaboration, and publication of final projects by DTETI UGM students',
      },
      {
        property: 'og:title',
        content: 'ReCapstone',
      },
      {
        property: 'og:description',
        content:
          'The official platform for documentation, collaboration, and publication of final projects by DTETI UGM students',
      },
      {
        property: 'og:image',
        content: '/dteti.png',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'The official platform for documentation, collaboration, and publication of final projects by DTETI UGM students',
      },
      {
        name: 'twitter:title',
        content: 'ReCapstone',
      },
      {
        name: 'twitter:description',
        content:
          'The official platform for documentation, collaboration, and publication of final projects by DTETI UGM students',
      },
      {
        name: 'twitter:image',
        content: '/dteti.png',
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
      <Toaster />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
