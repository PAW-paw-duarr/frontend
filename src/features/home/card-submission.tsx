import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { FileText, ExternalLink } from 'lucide-react';
import { PillAnggota, PillKetua } from './pill-user';

export function CardSubmission() {
  return (
    <Card className="flex w-full max-w-sm flex-col gap-3 rounded-xl border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Eco Friendly</h2>
        <p className="text-sm text-gray-500">24-11-2025</p>
      </div>

      <div className="flex flex-col gap-2">
        <PillKetua />
        <PillAnggota />
        <PillAnggota />
        <PillAnggota />
        <PillAnggota />

        <a href="/" className="mt-2 flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-gray-100">
          <FileText className="h-4 w-4 shrink-0" />
          <span className="grow truncate font-medium text-blue-600 underline">Grand Design_kelompok Jokowi.pdf</span>
          <ExternalLink className="h-4 w-4 shrink-0 text-gray-500" />
        </a>
      </div>

      <div className="flex w-full gap-3 pt-2">
        <Button variant="outline" className="flex-1">
          Tolak
        </Button>
        <Button variant="default" className="flex-1 bg-black text-white hover:bg-gray-800">
          Terima
        </Button>
      </div>
    </Card>
  );
}
