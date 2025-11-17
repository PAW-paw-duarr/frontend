import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../api-client';
import { z } from 'zod';
import { toast } from 'sonner';

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

  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof createTitleSchema>) => {
      return toast.promise(
        (async () => {
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
            throw new Error(error.message);
          }
          return data;
        })(),
        {
          loading: 'Creating title...',
          success: 'Title created successfully',
          error: (err) => `Create title failed: ${err.message}`,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getAllTitlesQuery().queryKey,
      });
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
      return toast.promise(
        (async () => {
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
            throw new Error(error.message);
          }
          return data;
        })(),
        {
          loading: 'Updating title...',
          success: 'Title updated successfully',
          error: (err) => `Update title failed: ${err.message}`,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getAllTitlesQuery().queryKey,
      });
    },
  });
}

export function useDeleteTitle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return toast.promise(
        (async () => {
          const { data, error } = await ApiClient.DELETE('/title/{id}', {
            params: {
              path: { id },
            },
          });
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })(),
        {
          loading: 'Deleting title...',
          success: 'Title deleted successfully',
          error: (err) => `Delete title failed: ${err.message}`,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getAllTitlesQuery().queryKey,
      });
    },
  });
}
