import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../api-client';
import { z } from 'zod';
import { toast } from 'sonner';

export function getAllSubmissionQuery() {
  return queryOptions({
    queryKey: ['submission', 'all'],
    queryFn: async () => {
      const { data, error } = await ApiClient.GET('/submission');
      if (error) {
        return [];
      }
      return data;
    },
  });
}

export function getSubmissionByIdQuery(id: string) {
  return queryOptions({
    queryKey: ['submission', id],
    queryFn: async () => {
      const { data, error } = await ApiClient.GET('/submission/{id}', {
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

export const createSubmissionSchema = z.object({
  team_target_id: z.string(),
  grand_design: z.instanceof(File).nullable(),
});
export function useCreateSubmission() {
  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof createSubmissionSchema>) => {
      return toast.promise(
        (async () => {
          if (dataInput.grand_design === null) {
            throw new Error('Grand design file is required');
          }
          const cleanData = {
            ...dataInput,
            grand_design: dataInput.grand_design,
          };
          const { data, error } = await ApiClient.POST('/submission/submit', {
            body: cleanData,
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
          loading: 'Creating submission...',
          success: 'Submission created successfully',
          error: (err) => `Create submission failed: ${err.message}`,
        }
      );
    },
  });
}

export const accOrRejectSubmissionSchema = z.object({
  id: z.string(),
  accept: z.boolean(),
});
export function useAccOrRejectSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof accOrRejectSubmissionSchema>) => {
      return toast.promise(
        (async () => {
          const { data, error } = await ApiClient.POST('/submission/response', {
            body: dataInput,
          });
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })(),
        {
          loading: 'Submitting response...',
          success: 'Response submitted successfully',
          error: (err) => `Response submission failed: ${err.message}`,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getAllSubmissionQuery().queryKey,
      });
    },
  });
}

export function useDeleteSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return toast.promise(
        (async () => {
          const { data, error } = await ApiClient.DELETE('/submission/{id}', {
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
          loading: 'Deleting submission...',
          success: 'Submission deleted successfully',
          error: (err) => `Delete submission failed: ${err.message}`,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getAllSubmissionQuery().queryKey,
      });
    },
  });
}
