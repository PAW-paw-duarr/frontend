import { queryOptions } from "@tanstack/react-query";
import { ApiClient } from "./api-client";

async function getUser() {
    const { data, error } = await ApiClient.GET("/user/me");
    if (error) {
        return null;
    }
    return data;
}

export function getUserQueryOptions() {
    return queryOptions({
        queryKey: ["user", "me"],
        queryFn: getUser,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
