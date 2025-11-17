import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getCurrentUserQuery } from '~/lib/api/user';
import { MyAccount } from '~/features/admin/components/my-account';

export const Route = createFileRoute('/_auth/admin/myaccount')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'My Account - Admin | ReCapstone',
      },
    ],
  }),
});

function RouteComponent() {
  const { data: accountData } = useQuery(getCurrentUserQuery());

  if (!accountData) {
    return null;
  }

  return <MyAccount />;
}
