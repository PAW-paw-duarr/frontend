import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex h-full flex-col overflow-hidden rounded-3xl border-2 border-gray-200 shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, src, alt, ...props }: React.ComponentProps<'img'> & { src?: string; alt?: string }) {
  return (
    <div className="p- relative w-full px-5 pt-5">
      <img
        src={src || '/foto_capstone.png'}
        alt={alt || 'foto_capstone'}
        className={cn('h-full w-full object-cover', className)}
        {...props}
      />
    </div>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  const text = props.children?.toString() || '';
  const words = text.split(' ');
  const truncatedText = words.length > 6 ? words.slice(0, 6).join(' ') + '...' : text;
  return (
    <h3 data-slot="card-title" className={cn('text-2xl font-bold', className)} {...props}>
      {truncatedText}
    </h3>
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const text = props.children?.toString() || '';
  const words = text.split(' ');
  const truncatedText = words.length > 10 ? words.slice(0, 10).join(' ') + '...' : text;

  return (
    <p data-slot="card-description" className={cn('text-sm leading-relaxed text-gray-600', className)} {...props}>
      {truncatedText}
    </p>
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('grow space-y-2 p-5', className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'> & {
  onClick: () => void;
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn('mt-auto flex items-center justify-end px-5 pb-5', className)}
      {...props}
    >
      <Button
        className="rounded-xl bg-black px-6 py-6 text-white hover:bg-gray-800"
        size={'lg'}
        onClick={props.onClick}
      >
        Detail →
      </Button>
    </div>
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-action" className={cn('absolute top-3 right-3', className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
