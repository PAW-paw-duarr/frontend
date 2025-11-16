import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export function TitleManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Judul Capstone Management</CardTitle>
        <CardDescription>Kelola semua judul capstone dalam sistem</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Fitur ini sedang dalam pengembangan...</p>
      </CardContent>
    </Card>
  );
}
