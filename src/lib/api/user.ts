import { queryOptions, useMutation } from "@tanstack/react-query";
import { ApiClient } from "../api-client";
import { z } from "zod";

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

export const updateMyProfile = z.object({
    name: z.string().optional(),
    email: z.email('Invalid email address').optional(),
    password: z
        .string()
        .min(8)
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character').optional(),
    cv_file: z.instanceof(File).optional(),
});
export function useUpdateMyProfile() {
    return useMutation({
        mutationFn: async (dataInput: z.infer<typeof updateMyProfile>) => {
            const { data, error } = await ApiClient.PATCH("/user", {
                body: dataInput,
                bodySerializer(body) {
                    const fd = new FormData();
                    for (const name in body) {
                        // @ts-expect-error FormData accepts File
                        fd.append(name, body[name]);
                    }
                    return fd;
                },
            })
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}