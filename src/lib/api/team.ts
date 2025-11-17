import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../api-client';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof joinTeamSchema>) => {
      const { data, error } = await ApiClient.POST('/team/join', {
        body: dataInput,
      });
      if (error) {
        throw new Error(error.message || error.error || 'Failed to join team');
      }

      return data;
    },
    onSuccess: async () => {
      toast.success('Joined team successfully');
      navigate({ to: '.', reloadDocument: true });
    },
    onError: (error) => {
      toast.error(`Join team failed: ${error.message}`);
    },
  });
}

export function useKickMember(teamdId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await ApiClient.DELETE('/team/kick/{id}', {
        params: { path: { id } },
      });
      if (error) {
        throw new Error(error.message || error.error || 'Failed to kick member');
      }
      return data;
    },
    onSuccess: async () => {
      toast.success('Member kicked successfully');
      await queryClient.refetchQueries(getTeamByIdQuery(teamdId));
    },
    onError: (error) => {
      toast.error(`Kick member failed: ${error.message}`);
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await ApiClient.DELETE('/team/{id}', {
        params: {
          path: { id },
        },
      });
      if (error) {
        throw new Error(error.message || error.error || 'Failed to delete team');
      }
      return data;
    },
    onSuccess: async () => {
      toast.success('Team deleted successfully');
      await queryClient.refetchQueries({
        queryKey: getAllTeamQuery().queryKey,
      });
    },
    onError: (error) => {
      toast.error(`Delete team failed: ${error.message}`);
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
      const { data, error } = await ApiClient.POST('/team/new', {
        body: dataInput,
      });
      if (error) {
        throw new Error(error.message || error.error || 'Failed to create team');
      }
      return data;
    },
    onSuccess: async () => {
      toast.success('Team created successfully');
      await queryClient.refetchQueries({
        queryKey: getAllTeamQuery().queryKey,
      });
    },
    onError: (error) => {
      toast.error(`Create team failed: ${error.message}`);
    },
  });
}
