import { zodResolver } from '@hookform/resolvers/zod';
import { UploadIcon, Trash2Icon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '~/components/ui/button';
import { FieldGroup, Field, FieldLabel, FieldDescription, FieldError } from '~/components/ui/field';
import { Dropzone, DropzoneEmptyState } from '~/components/ui/shadcn-io/dropzone';
import { createTeamSchema, useCreateTeam } from '~/lib/api/team';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Switch } from '~/components/ui/switch';
import { Label } from '~/components/ui/label';
import { ScrollArea } from '~/components/ui/scroll-area';
import type { components } from '~/lib/api-schema';
import { useNavigate } from '@tanstack/react-router';

export function NewTeams() {
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      new_period: false,
      team_data: [],
    },
  });
  const mutation = useCreateTeam();
  const [previewData, setPreviewData] = useState<components['schemas']['data-team-new'][]>([]);
  // eslint-disable-next-line react-hooks/incompatible-library
  const teamData = watch('team_data');

  const handleCSVUpload = (file: File) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const ALLOWED_CATEGORIES = [
          'Kesehatan',
          'Pengelolaan Sampah',
          'Smart City',
          'Transportasi Ramah Lingkungan',
        ] as const;
        type Cat = (typeof ALLOWED_CATEGORIES)[number];

        const parsedData = results.data.map((row) => {
          const rawCategory = row['category'] || row['Category'] || '';
          const matchedCategory =
            (ALLOWED_CATEGORIES.includes(rawCategory as Cat) && (rawCategory as Cat)) ||
            (ALLOWED_CATEGORIES.find((c) => c.toLowerCase() === rawCategory.toLowerCase()) as Cat) ||
            ALLOWED_CATEGORIES[0];

          return {
            name: row['name'] || row['Name'] || '',
            leader_email: row['leader_email'] || row['Leader Email'] || row['email'] || '',
            category: matchedCategory,
          };
        }) as components['schemas']['data-team-new'][];

        setPreviewData(parsedData);
        setValue('team_data', parsedData);
        toast.success(`${parsedData.length} teams loaded from CSV`);
      },
      error: (error) => {
        toast.error(`CSV parsing error: ${error.message}`);
      },
    });
  };

  const onSubmit = handleSubmit((data) => {
    if (data.team_data.length === 0) {
      toast.error('Please upload a CSV file with team data');
      return;
    }
    mutation.mutate(data, {
      onSuccess: () => {
        setPreviewData([]);
        setValue('team_data', []);
        navigate({ to: '/admin/teams' });
      },
    });
  });

  const removeTeam = (index: number) => {
    const updated = teamData.filter((_, i) => i !== index);
    setPreviewData(updated);
    setValue('team_data', updated);
  };

  return (
    <div className="w-full items-center px-12 py-6">
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-4xl space-y-6">
        <FieldGroup>
          <Controller
            name="team_data"
            control={control}
            render={({ fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="csv_file">Team Data (CSV)</FieldLabel>
                <FieldDescription>Upload a CSV file with columns: name, leader_email, category</FieldDescription>
                <Dropzone
                  accept={{
                    'text/csv': ['.csv'],
                    'application/vnd.ms-excel': ['.csv'],
                  }}
                  onDrop={(acceptedFiles) => {
                    if (acceptedFiles[0]) {
                      handleCSVUpload(acceptedFiles[0]);
                    }
                  }}
                  onError={(error) => {
                    toast.error(`File upload error: ${error.message}`);
                  }}
                  maxFiles={1}
                >
                  <DropzoneEmptyState>
                    <div className="flex w-full items-center gap-4 p-8">
                      <div className="bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-lg">
                        <UploadIcon size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium">Upload CSV file</p>
                        <p className="text-muted-foreground text-xs">Drag and drop or click to upload</p>
                        <p className="text-muted-foreground text-xs">CSV format only</p>
                      </div>
                    </div>
                  </DropzoneEmptyState>
                </Dropzone>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {previewData.length > 0 && (
            <Field>
              <FieldLabel>Preview Team Data ({previewData.length} teams)</FieldLabel>
              <div className="overflow-hidden rounded-lg border">
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Leader Email</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="w-16">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((team, index) => (
                        <TableRow key={index}>
                          <TableCell>{team.name}</TableCell>
                          <TableCell>{team.leader_email}</TableCell>
                          <TableCell>{team.category}</TableCell>
                          <TableCell>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeTeam(index)}>
                              <Trash2Icon size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </Field>
          )}

          <Controller
            name="new_period"
            control={control}
            render={({ field }) => (
              <Field>
                <div className="flex items-center space-x-2">
                  <Switch id="new_period" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="new_period">Start New Period</Label>
                </div>
                <FieldDescription>Enable this to create teams for a new competition period</FieldDescription>
              </Field>
            )}
          />

          <FieldGroup>
            <Field>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Create Teams'}
              </Button>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
