import { useForm, Controller } from 'react-hook-form';
import { Button } from 'src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from 'src/components/ui/field';
import { Input } from 'src/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTitleSchema, useCreateTitle } from '~/lib/api/title';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '~/components/ui/shadcn-io/dropzone';
import { toast } from 'sonner';
import { UploadIcon } from 'lucide-react';

export function SignupTitleForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTitleSchema),
  });
  const mutation = useCreateTitle();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Judul</CardTitle>
        <CardDescription>Masukkan informasi proyek Anda di form berikut.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate(data);
          })}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Judul Proyek</FieldLabel>
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input {...field} id="title" type="text" placeholder="Masukkan judul proyek" />}
              />
              {errors.title && <FieldDescription className="text-red-500">{errors.title.message}</FieldDescription>}
            </Field>
            <Field>
              <FieldLabel htmlFor="desc">Deskripsi Singkat</FieldLabel>
              <Controller
                name="desc"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="desc" type="text" placeholder="Masukkan deskripsi singkat" />
                )}
              />
              {errors.desc && <FieldDescription className="text-red-500">{errors.desc.message}</FieldDescription>}
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Deskripsi Lengkap</FieldLabel>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="description" type="textarea" placeholder="Masukkan deskripsi lengkap" />
                )}
              />
              {errors.description && (
                <FieldDescription className="text-red-500">{errors.description.message}</FieldDescription>
              )}
            </Field>

            <Controller
              name="photo_file"
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="photo file">Unggah Foto</FieldLabel>
                  <Dropzone
                    accept={{
                      'image/png': [],
                      'image/jpg': [],
                      'image/jpeg': [],
                      'image/svg+xml': [],
                    }}
                    onDrop={(acceptedFiles) => {
                      onChange(acceptedFiles[0]);
                    }}
                    onError={(error) => {
                      toast.error(`File upload error: ${error.message}`);
                    }}
                    src={value ? [value] : undefined}
                    maxFiles={1}
                  >
                    <DropzoneEmptyState>
                      <div className="flex w-full items-center gap-4 p-8">
                        <div className="bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-lg">
                          <UploadIcon size={24} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">Upload a file</p>
                          <p className="text-muted-foreground text-xs">Drag and drop or click to upload</p>
                          <p className="text-muted-foreground text-xs">JPG, PNG, SVG</p>
                        </div>
                      </div>
                    </DropzoneEmptyState>

                    <DropzoneContent />
                  </Dropzone>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  <FieldDescription className="text-red-500">{errors.description?.message}</FieldDescription>
                </Field>
              )}
            />
            <Controller
              name="proposal_file"
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="proposal file">Unggah Dokumen Proposal</FieldLabel>

                  <Dropzone
                    accept={{
                      'application/pdf': [],
                    }}
                    onDrop={(acceptedFiles) => {
                      onChange(acceptedFiles[0]);
                    }}
                    onError={(error) => {
                      toast.error(`File upload error: ${error.message}`);
                    }}
                    src={value ? [value] : undefined}
                    maxFiles={1}
                  >
                    <DropzoneEmptyState>
                      <div className="flex w-full items-center gap-4 p-8">
                        <div className="bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-lg">
                          <UploadIcon size={24} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">Upload a file</p>
                          <p className="text-muted-foreground text-xs">Drag and drop or click to upload</p>
                          <p className="text-muted-foreground text-xs">PDF</p>
                        </div>
                      </div>
                    </DropzoneEmptyState>

                    <DropzoneContent />
                  </Dropzone>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <FieldGroup>
              <Field>
                <Button type="submit">Simpan</Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
