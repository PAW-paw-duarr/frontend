import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useUpdateMyProfile, updateMyProfile } from '~/lib/api/user';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

interface ProfileDiriProps {
  user: {
    name: string;
    email: string;
    cv_url?: string;
  };
}

const passwordSchema = z.object({
  password_saat_ini: z.string().min(1, 'Password saat ini diperlukan'),
  password_baru: z.string().min(8, 'Password minimal 8 karakter'),
  password_konfirmasi: z.string(),
}).refine((data) => data.password_baru === data.password_konfirmasi, {
  message: "Password tidak sesuai",
  path: ["password_konfirmasi"],
});

export function ProfileDiri({ user }: ProfileDiriProps) {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const updateProfileMutation = useUpdateMyProfile();

  const { handleSubmit: handleSubmitName, control: controlName, formState: formStateNameForm } = useForm({
    resolver: zodResolver(updateMyProfile),
    defaultValues: {
      name: user.name,
    },
  });

  const { handleSubmit: handleSubmitPassword, control: controlPassword, formState: formStatePassword, reset: resetPasswordForm } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password_saat_ini: '',
      password_baru: '',
      password_konfirmasi: '',
    },
  });

  const onSubmitName = async (data: any) => {
    try {
      await updateProfileMutation.mutateAsync({
        name: data.name,
      });
      toast.success('Nama berhasil diperbarui');
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    } catch (error) {
      toast.error('Gagal memperbarui nama');
    }
  };

  const onSubmitPassword = async (data: any) => {
    try {
      await updateProfileMutation.mutateAsync({
        password: data.password_baru,
      });
      toast.success('Password berhasil diperbarui');
      resetPasswordForm();
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    } catch (error) {
      toast.error('Gagal memperbarui password');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File terlalu besar (max 5MB)');
        return;
      }
      setCvFile(file);
    }
  };

  const handleUploadCV = async () => {
    if (!cvFile) return;

    try {
      await updateProfileMutation.mutateAsync({
        cv_file: cvFile,
      });
      toast.success('CV berhasil diupload');
      setCvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    } catch (error) {
      toast.error('Gagal upload CV');
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Profile Diri</CardTitle>
        <CardDescription>Kelola informasi akun dan upload CV kamu</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Ubah Nama */}
          <form onSubmit={handleSubmitName(onSubmitName)}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-sm">Ubah Nama</h3>
              </div>
              <FieldGroup>
                <Controller
                  name="name"
                  control={controlName}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
                      <Input id="name" placeholder="Nama Lengkap" {...field} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Button
                type="submit"
                className="w-full mt-3 bg-black hover:bg-gray-800"
                disabled={updateProfileMutation.isPending || !formStateNameForm.isDirty}
              >
                {updateProfileMutation.isPending ? 'Menyimpan...' : 'Simpan Nama'}
              </Button>
            </div>
          </form>

          {/* Ubah Password */}
          <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="font-semibold text-sm">Ubah Password</h3>
              </div>
              <FieldGroup className="space-y-2">
                <Controller
                  name="password_saat_ini"
                  control={controlPassword}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password_saat_ini">Password Saat Ini</FieldLabel>
                      <Input
                        id="password_saat_ini"
                        type="password"
                        placeholder="Masukkan password saat ini"
                        {...field}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="password_baru"
                  control={controlPassword}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password_baru">Password Baru</FieldLabel>
                      <FieldDescription className="text-xs">
                        Min 8 karakter, min 1 uppercase, 1 lowercase, 1 angka, 1 special char
                      </FieldDescription>
                      <Input
                        id="password_baru"
                        type="password"
                        placeholder="Masukkan password baru"
                        {...field}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="password_konfirmasi"
                  control={controlPassword}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password_konfirmasi">Konfirmasi Password Baru</FieldLabel>
                      <Input
                        id="password_konfirmasi"
                        type="password"
                        placeholder="Konfirmasi password baru"
                        {...field}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Button
                type="submit"
                className="w-full mt-3 bg-black hover:bg-gray-800"
                disabled={updateProfileMutation.isPending || !formStatePassword.isDirty}
              >
                {updateProfileMutation.isPending ? 'Memperbarui...' : 'Update Password'}
              </Button>
            </div>
          </form>

          {/* Upload CV */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-semibold text-sm">Upload CV</h3>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition cursor-pointer"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                {cvFile ? cvFile.name : 'Klik untuk upload CV'}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-2">Format: PDF, max 5MB</p>
            {cvFile && (
              <Button
                onClick={handleUploadCV}
                className="w-full mt-3 bg-black hover:bg-gray-800"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? 'Uploading...' : 'Upload CV'}
              </Button>
            )}
            {!cvFile && user.cv_url && (
              <Button variant="outline" className="w-full mt-3">
                Lihat CV
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
