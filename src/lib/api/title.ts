import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../api-client';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export function getAllTitlesQuery() {
  return queryOptions({
    queryKey: ['titles', 'all'],
    queryFn: async () => {
      const { data, error } = await ApiClient.GET('/title');
      if (error) {
        return [];
      }
      return data;
    },
  });
}

export function getTitleByIdQuery(id: string) {
  return queryOptions({
    queryKey: ['title', id],
    queryFn: async () => {
      const { data, error } = await ApiClient.GET('/title/{id}', {
        params: {
          path: { id },
        },
      });
      if (error) {
        return null;
      }
      return data;
    },
  });
}

export const createTitleSchema = z.object({
  title: z.string(),
  desc: z.string().max(255),
  description: z.string(),
  photo_file: z.instanceof(File),
  proposal_file: z.instanceof(File),
});
export function useCreateTitle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof createTitleSchema>) => {
      const { data, error } = await ApiClient.POST('/title', {
        body: dataInput,
        bodySerializer(body) {
          const fd = new FormData();
          for (const name in body) {
            // @ts-expect-error FormData accepts File
            fd.append(name, body[name]);
          }
          return fd;
        },
      });
      if (error) {
        throw new Error(error.message || error.error || 'Failed to create title');
      }

      return data;
    },
    onSuccess: async () => {
      toast.success('Title created successfully');
      await queryClient.refetchQueries({
        queryKey: getAllTitlesQuery().queryKey,
      });
      navigate({ to: '.', reloadDocument: true });
    },
    onError: (error) => {
      toast.error(`Create title failed: ${error.message}`);
    },
  });
}

export const updateTitleSchema = z.object({
  title: z.string().optional(),
  desc: z.string().max(255).optional(),
  description: z.string().optional(),
  photo_file: z.instanceof(File).optional(),
  proposal_file: z.instanceof(File).optional(),
});
export function useUpdateTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof updateTitleSchema>) => {
      const { data, error } = await ApiClient.PATCH('/title', {
        body: dataInput,
        bodySerializer(body) {
          const fd = new FormData();
          for (const name in body) {
            // @ts-expect-error FormData accepts File
            fd.append(name, body[name]);
          }
          return fd;
        },
      });
      if (error) {
        throw new Error(error.message || error.error || 'Failed to update title');
      }

      return data;
    },
    onSuccess: async () => {
      toast.success('Title updated successfully');
      await queryClient.refetchQueries({
        queryKey: getAllTitlesQuery().queryKey,
      });
    },
    onError: (error) => {
      toast.error(`Update title failed: ${error.message}`);
    },
  });
}

export function useDeleteTitle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await ApiClient.DELETE('/title/{id}', {
        params: {
          path: { id },
        },
      });
      if (error) {
        throw new Error(error.message || error.error || 'Failed to delete title');
      }
      return data;
    },
    onSuccess: async () => {
      toast.success('Title deleted successfully');
      await queryClient.refetchQueries({
        queryKey: getAllTitlesQuery().queryKey,
      });
    },
    onError: (error) => {
      toast.error(`Delete title failed: ${error.message}`);
    },
  });
}
