"use client";
import axios, { AxiosError } from "axios";
import { useAuthHeader } from "@foodify/auth";
import { toast } from "sonner";

interface IFunctionInvoke {
	body?: object | string;
	headers?: object;
	functionName: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

export const useFetch = () => {
	const authHeader = useAuthHeader()?.split(" ");
	return {
		functionInvoke: async <T>({
			functionName,
			headers,
			body,
			method = "POST",
		}: IFunctionInvoke): Promise<{ data: T | null; error: any }> => {
			try {
				const response = await axios({
					url: `${process.env.NEXT_PUBLIC_WEB_URL}/${functionName}`,
					method: method,
					headers: {
						Authorization: `Bearer ${authHeader?.[1]}`,
						"Content-Type": "application/json",
						...headers,
					},
					data: body,
				});

				return { data: response?.data, error: null };
			} catch (error) {
				if (error instanceof AxiosError) {
					const errorMessage =
						error.response?.data?.error?.message || error.message;

					if (error.response) {
						// toast.error(`Http Request Error: ${errorMessage}`);
					} else if (error.request) {
						toast.error(`Functions Relay Error: ${errorMessage}`);
					} else {
						toast.error(`Fetch Error: ${errorMessage}`);
					}

					return { data: null, error: errorMessage };
				}
				return { data: null, error };
			}
		},
	};
};
