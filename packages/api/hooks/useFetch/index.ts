"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAuthHeader } from "@foodify/auth";
import { toast } from "sonner";
import { get } from "lodash";

// ========== TYPE DEFINITIONS ==========
interface RequestConfig {
	body?: object | string;
	headers?: Record<string, string>;
	functionName: string;
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

interface ApiResponse<T> {
	data: T | null;
	error: string | null;
}

// ========== ERROR HANDLING ==========
/**
 * Handles different types of Axios errors and displays appropriate toast messages
 */
class ApiErrorHandler {
	static handle(error: AxiosError): string {
		console.log(error)
		const errorMessage = get(error, "response.data.error.message") || error.message;

		if (error.response) {
			// Server responded with error status (4xx, 5xx)
			// Note: HTTP errors are handled by the caller based on requirements
		} else if (error.request) {
			// Request made but no response received
			toast.error(`Network Error: ${errorMessage}`);
			console.log(error)
		} else {
			// Something else happened
			toast.error(`Request Error: ${errorMessage}`);
		}

		return errorMessage;
	}
}

// ========== HTTP CLIENT ==========
/**
 * Centralized HTTP client for making API requests
 */
class HttpClient {
	private baseURL: string;
	private authToken: string | null;

	constructor(baseURL: string, authToken: string | null) {
		this.baseURL = baseURL;
		this.authToken = authToken;
	}

	/**
	 * Executes an HTTP request with configured headers and error handling
	 */
	async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
		try {
			const response: AxiosResponse<T> = await axios({
				url: `${this.baseURL}/${config.functionName}`,
				method: config.method || "POST",
				headers: this.buildHeaders(config.headers),
				data: config.body,
			});

			return { data: response.data, error: null };
		} catch (error) {
			const errorMessage = error instanceof AxiosError
				? ApiErrorHandler.handle(error)
				: "An unexpected error occurred";

			return { data: null, error: errorMessage };
		}
	}

	/**
	 * Builds request headers with authorization and content type
	 */
	private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...customHeaders,
		};

		if (this.authToken) {
			headers.Authorization = `Bearer ${this.authToken}`;
		}

		return headers;
	}
}

// ========== HOOK IMPLEMENTATION ==========
/**
 * Custom hook for making API requests with authentication
 * @returns Object with functionInvoke method for making HTTP requests
 */
export const useFetch = () => {
	const authHeader = useAuthHeader();
	// Extract token from "Bearer <token>" format or use null
	const authToken = authHeader?.split(" ")[1] || null;
	const baseURL = process.env.NEXT_PUBLIC_WEB_URL;

	/**
	 * Invokes an API function with the given configuration
	 */
	const functionInvoke = async <T>(config: RequestConfig): Promise<ApiResponse<T>> => {
		const client = new HttpClient(String(baseURL), authToken);
		return client.request<T>(config);
	};

	return { functionInvoke };
};