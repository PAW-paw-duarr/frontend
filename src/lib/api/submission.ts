import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../api-client";
import { z } from "zod";
import { toast } from "sonner";

export function getAllSubmissionQuery() {
    return queryOptions({
        queryKey: ["submission", "all"],
        queryFn: async () => {
            const { data, error } = await ApiClient.GET("/submission")
            if (error) {
                return [];
            }
            return data;
        },
    });
}

export function getSubmissionByIdQuery(id: string) {
    return queryOptions({
        queryKey: ["submission", id],
        queryFn: async () => {
            const { data, error } = await ApiClient.GET("/submission/{id}", {
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

export const createSubmissionSchema = z.object({
    team_target_id: z.string(),
    grand_design: z.instanceof(File),
});
export function useCreateSubmission() {
    return useMutation({
        mutationFn: async (dataInput: z.infer<typeof createSubmissionSchema>) => {
            const { data, error } = await ApiClient.POST("/submission/submit", {
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
        onSuccess: async () => {
            toast.success("Submission created successfully");
        },
        onError: (error) => {
            toast.error(`Create submission failed: ${error.message}`);
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
            const { data, error } = await ApiClient.POST("/submission/response", {
                body: dataInput,
            })
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: async () => {
            toast.success("Response submitted successfully");
            await queryClient.refetchQueries({
                queryKey: getAllSubmissionQuery().queryKey,
            });
        },
        onError: (error) => {
            toast.error(`Response submission failed: ${error.message}`);
        },
    });
}

export function useDeleteSubmission() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data, error } = await ApiClient.DELETE("/submission/{id}", {
                params: {
                    path: { id },
                }
            })
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
        onSuccess: async () => {
            toast.success("Submission deleted successfully");
            await queryClient.refetchQueries({
                queryKey: getAllSubmissionQuery().queryKey,
            });
        },
        onError: (error) => {
            toast.error(`Delete submission failed: ${error.message}`);
        },
    });
}
