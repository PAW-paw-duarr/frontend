import createClient from "openapi-fetch";
import type { paths } from "./api-schema";

export const ApiClient = createClient<paths>({ baseUrl: "/api" });