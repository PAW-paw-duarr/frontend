import { Crown, User } from 'lucide-react';
import { Button } from '~/components/ui/button';

export function PillAnggota() {
  return (
    <Button variant="outline" className="w-fit justify-start gap-2">
      <User className="h-4 w-4" />
      Anggota 1 (FufuFafa)
    </Button>
  );
}

export function PillKetua() {
  return (
    <Button variant="default" className="w-fit justify-start gap-2 bg-black text-white hover:bg-gray-800">
      <Crown className="h-4 w-4" />
      Ketua Kelompoknya Jokowi
    </Button>
  );
}
