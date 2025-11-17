import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../api-client";
import { z } from "zod";
import { toast } from "sonner";

export function getCurrentUserQuery() {
    return queryOptions({
        queryKey: ["user", "me"],
        queryFn: async () => {
            const { data, error } = await ApiClient.GET("/user/me");
            if (error) {
                return null;
            }
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export function getUserByIdQuery(id: string) {
    return queryOptions({
        queryKey: ["user", id],
        queryFn: async () => {
            const { data, error } = await ApiClient.GET("/user/{id}", {
                params: {
                    path: { id },
                }
            });
            if (error) {
                return null;
            }
            return data;
        },
    });
}

export function getAllUsersQuery() {
    return queryOptions({
        queryKey: ["user", "all"],
        queryFn: async () => {
            const { data, error } = await ApiClient.GET("/user")
            if (error) {
                return [];
            }
            return data;
        },
    });
}

export const updateMyProfileSchema = z
    .object({
        name: z.string().min(1, 'Name cannot be empty').max(100).optional(),
        password: z.string().optional(),
        cv_file: z.instanceof(File).optional(),
        confirmPassword: z.string({
            error: (issue) =>
                issue.input === undefined ? 'Confirm Password is required' : 'Confirm Password must be a string',
        }).optional(),
    }).superRefine((data, ctx) => {
        const { password, confirmPassword } = data;
        const add = (path: (string | number)[], message: string) =>
            ctx.addIssue({ code: z.ZodIssueCode.custom, message, path });
        if (password) {
            if (!confirmPassword) {
                add(['confirmPassword'], 'Please confirm your new password');
            } else if (password !== confirmPassword) {
                add(['confirmPassword'], 'Passwords do not match');
            }

            if (password.length < 8) {
                add(['password'], 'Password must be at least 8 characters long');
            }
            if (!/[A-Z]/.test(password)) {
                add(['password'], 'Password must contain at least one uppercase letter');
            }
            if (!/[a-z]/.test(password)) {
                add(['password'], 'Password must contain at least one lowercase letter');
            }
            if (!/[0-9]/.test(password)) {
                add(['password'], 'Password must contain at least one number');
            }
            if (!/[^A-Za-z0-9]/.test(password)) {
                add(['password'], 'Password must contain at least one special character');
            }
        } else if (confirmPassword) {
            add(['password'], 'Password is required when confirming password');
        }
    });

export function useUpdateMyProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dataInput: z.infer<typeof updateMyProfileSchema>) => {
            const { data, error } = await ApiClient.PATCH("/user", {
                body: dataInput,
                bodySerializer(body) {
                    const fd = new FormData();
                    if (body) {
                        if (body.name !== undefined) {
                            fd.append('name', body.name);
                        }
                        if (body.password !== undefined && body.password !== "") {
                            fd.append('password', body.password);
                        }
                        if (body.cv_file !== undefined) {
                            fd.append('cv_file', body.cv_file);
                        }
                    }
                    return fd;
                },
            })
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({
                queryKey: getCurrentUserQuery().queryKey,
            });
        },
        onError: (error) => {
            toast.error(`Update profile failed: ${error.message}`);
        },
    });
}