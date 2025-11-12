import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card, CardDescription } from '~/components/ui/card';

export function CardCapstone() {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-xl p-3 gap-3">
      <div className="relative rounded-xl overflow-hidden">
        <div className="bg-muted aspect-video w-full" />
      </div>
      <div>
        <h2 className="text-3xl font-semibold">Judul 1</h2>
        <CardDescription>Deskaripsi singkat tentang kepstong kelompok jaya.</CardDescription>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@ketua1" />
            <AvatarFallback>K1</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Ketua1</p>
            <p className="text-muted-foreground text-xs">Ketua1@gmail.com</p>
          </div>
        </div>
        <Button>
          Detail
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
