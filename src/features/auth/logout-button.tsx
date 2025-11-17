import { Button } from '~/components/ui/button';
import { useLogout } from '../../lib/api/auth';

export function LogoutButton() {
  const mutation = useLogout();
  return (
    <Button variant="destructive" onClick={() => mutation.mutate()} loading={mutation.isPending}>
      Logout
    </Button>
  );
}
