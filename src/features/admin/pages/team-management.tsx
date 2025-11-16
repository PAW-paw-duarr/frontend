import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export function TeamManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tim Capstone Management</CardTitle>
        <CardDescription>Kelola semua tim capstone dalam sistem</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Fitur ini sedang dalam pengembangan...</p>
      </CardContent>
    </Card>
  );
}
