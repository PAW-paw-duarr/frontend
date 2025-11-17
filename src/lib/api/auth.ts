import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { ApiClient } from 'src/lib/api-client';
import { useNavigate } from '@tanstack/react-router';
import { getCurrentUserQuery } from './user';

export const LoginWithEmailInputSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string({
      error: (issue) => (issue.input === undefined ? 'Password is required' : 'Password must be a string'),
    })
    .min(1, { message: 'Password is required' }),
});
export function useLoginWithEmail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof LoginWithEmailInputSchema>) => {
      const { data, error } = await ApiClient.POST('/auth/signin/password', {
        body: dataInput,
      });
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: getCurrentUserQuery().queryKey,
      });
      navigate({
        to: '/',
      });
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });
}

export const SignUpWithEmailInputSchema = z
  .object({
    name: z
      .string({
        error: (issue) => (issue.input === undefined ? 'Name is required' : 'Name must be a string'),
      })
      .min(1, { message: 'Name is required' }),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z
      .string({
        error: (issue) =>
          issue.input === undefined ? 'Confirm Password is required' : 'Confirm Password must be a string',
      })
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export function useSignUpWithEmail() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (dataInput: z.infer<typeof SignUpWithEmailInputSchema>) => {
      const { data, error } = await ApiClient.POST('/auth/signup/password', {
        body: dataInput,
      });
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      navigate({
        to: '/',
      });
    },
    onError: (error) => {
      toast.error(`Signup failed: ${error.message}`);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { error } = await ApiClient.POST('/auth/signout');
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.clear();
      navigate({
        to: '/login',
      });
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error.message}`);
    },
  });
}
