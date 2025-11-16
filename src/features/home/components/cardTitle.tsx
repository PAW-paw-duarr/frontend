import * as React from 'react';
import { cn } from 'src/lib/utils';
import { Button } from '../../../components/ui/button';
import { Avatar, AvatarImage } from '../../../components/ui/avatar';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col overflow-hidden rounded-3xl border-2 border-gray-200 shadow-sm',
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
  return <div data-slot="card-content" className={cn('space-y-2 p-5', className)} {...props} />;
}

function CardFooter({
  className,
  avatarSrc,
  userName,
  userEmail,
  onClick, // <-- Tambahkan parameter ini
  ...props
}: React.ComponentProps<'div'> & {
  avatarSrc?: string;
  userName?: string;
  userEmail?: string;
  onClick?: () => void; // <-- Tambahkan type ini
}) {
  return (
    <div data-slot="card-footer" className={cn('flex items-center justify-between px-5 pb-5', className)} {...props}>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarSrc || '/logo.svg'} alt={userName || 'User'} />
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{userName || 'Ketua1'}</span>
          <span className="text-xs text-gray-500">{userEmail || 'ketua1@gmail.com'}</span>
        </div>
      </div>
      <Button
        onClick={onClick} // <-- Tambahkan onClick handler ini
        className="rounded-xl bg-black px-6 py-6 text-white hover:bg-gray-800"
        size={'lg'}
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
