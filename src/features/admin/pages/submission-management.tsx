import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export function SubmissionManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengajuan Management</CardTitle>
        <CardDescription>Kelola semua pengajuan dalam sistem</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Fitur ini sedang dalam pengembangan...</p>
      </CardContent>
    </Card>
  );
}
