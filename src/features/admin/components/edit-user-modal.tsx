import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Field, FieldLabel, FieldError } from '~/components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id?: string;
    name?: string;
    email?: string;
    team_id?: string;
    cv_url?: string;
  };
  teams: Array<{ id?: string; name?: string }>;
  onSave: (data: any) => Promise<void>;
}

const editUserSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  email: z.string().email('Email tidak valid'),
  team_id: z.string().optional().nullable(),
  cv_file: z.any().optional(),
});

export function EditUserModal({ isOpen, onClose, user, teams, onSave }: EditUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cvFileName, setCvFileName] = useState(user.cv_url ? 'jenacile_CV_jbt.pdf' : '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, control, formState: { isDirty } } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      team_id: user.team_id || '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFileName(file.name);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold">Edit</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-6">Ubah dan perbarui data diri pengguna</p>

          {/* Nama */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Nama</FieldLabel>
                <Input
                  id="name"
                  placeholder="Masukkan nama..."
                  {...field}
                  className="border-dashed"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email..."
                  {...field}
                  className="border-dashed"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Tim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tim</label>
            <Controller
              name="team_id"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value || ''}
                  className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg bg-white text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Drop Down Tim</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id || ''}>
                      {team.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Curriculum Vitae</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition"
            >
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <p className="text-sm text-gray-600">Unggah CV</p>
              <p className="text-xs text-gray-500 mt-1">Unggah File</p>
            </div>

            {/* File display */}
            {cvFileName && (
              <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M15 7H3V5.4A1.4 1.4 0 014.4 4h8.2A1.4 1.4 0 0114 5.4V7z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{cvFileName}</p>
                    <p className="text-xs text-gray-500">Uploaded: 15 Januari 2024</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-200 rounded transition"
                    title="Download"
                  >
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v-6a1.5 1.5 0 011.5-1.5h8A1.5 1.5 0 0118 4.5v6a1.5 1.5 0 11-3 0v-6a.5.5 0 00-.5-.5h-8a.5.5 0 00-.5.5v6z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-gray-200 rounded transition"
                    title="Delete"
                    onClick={() => {
                      setCvFileName('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4.707 4.707a1 1 0 010 1.414L8.586 10l-3.879 3.879a1 1 0 101.414 1.414L10 11.414l3.879 3.879a1 1 0 001.414-1.414L11.414 10l3.879-3.879a1 1 0 00-1.414-1.414L10 8.586 6.121 4.707a1 1 0 00-1.414 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading || !isDirty}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium"
            >
              {isLoading ? 'Saving...' : 'Save changed'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
