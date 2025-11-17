import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../api-client';
import { z } from 'zod';
import { toast } from 'sonner';

export function getAllTeamQuery() {
  return queryOptions({
    queryKey: ['team', 'all'],
    queryFn: async () => {
      const { data, error } = await ApiClient.GET('/team');
      if (error) {
        return [];
      }
      return data;
    },
  });
}

export function getTeamByIdQuery(id: string) {
  return queryOptions({
    queryKey: ['team', id],
    queryFn: async () => {
      const { data, error } = await ApiClient.GET('/team/{id}', {
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

export const joinTeamSchema = z.object({
  code: z.string(),
});
export function useJoinTeam() {
  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof joinTeamSchema>) => {
      return toast.promise(
        (async () => {
          const { data, error } = await ApiClient.POST('/team/join', {
            body: dataInput,
          });
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })(),
        {
          loading: 'Joining team...',
          success: 'Joined team successfully',
          error: (err) => `Join team failed: ${err.message}`,
        }
      );
    },
  });
}

export function useKickMember(teamdId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return toast.promise(
        (async () => {
          const { data, error } = await ApiClient.DELETE('/team/kick/{id}', {
            params: { path: { id } },
          });
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })(),
        {
          loading: 'Kicking member...',
          success: 'Member kicked successfully',
          error: (err) => `Kick member failed: ${err.message}`,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries(getTeamByIdQuery(teamdId));
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return toast.promise(
        (async () => {
          const { data, error } = await ApiClient.DELETE('/team/{id}', {
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
          loading: 'Deleting team...',
          success: 'Team deleted successfully',
          error: (err) => `Delete team failed: ${err.message}`,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getAllTeamQuery().queryKey,
      });
    },
  });
}

export const createTeamSchema = z.object({
  new_period: z.boolean(),
  team_data: z.array(
    z.object({
      name: z.string(),
      leader_email: z.email('Invalid email address'),
      category: z.enum(['Kesehatan', 'Pengelolaan Sampah', 'Smart City', 'Transportasi Ramah Lingkungan']),
    })
  ),
});
export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof createTeamSchema>) => {
      return toast.promise(
        (async () => {
          const { data, error } = await ApiClient.POST('/team/new', {
            body: dataInput,
          });
          if (error) {
            throw new Error(error.message);
          }
          return data;
        })(),
        {
          loading: 'Creating teams...',
          success: 'Teams created successfully',
          error: (err) => `Create team failed: ${err.message}`,
        }
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getAllTeamQuery().queryKey,
      });
    },
  });
}
