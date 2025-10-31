import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '~/components/ui/empty';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>The page you&apos;re looking for doesn&apos;t exist.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <Link to="/">Go back home</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
