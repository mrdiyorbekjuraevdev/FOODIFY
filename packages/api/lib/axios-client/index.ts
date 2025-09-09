import axios, {
    type AxiosInstance,
    type AxiosResponse,
    type AxiosError,
    type InternalAxiosRequestConfig,
} from "axios";

// Environment variables should be properly typed and have fallbacks
const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const REQUEST_TIMEOUT = 12000;

// Custom error class to provide better error handling
export class APIError extends Error {
    code: string;
    status: number;

    constructor(message: string, code: string, status: number) {
        super(message);
        this.name = "APIError";
        this.code = code;
        this.status = status;
    }
}

export const upload = axios.create({
    baseURL: BASE_URL, // Or your actual upload API base URL
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 12000,
});

// Create a more robust axios instance
const createAPIClient = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: REQUEST_TIMEOUT,
    });

    // Request interceptor with proper typing for newer Axios versions
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            // Set default headers
            config.headers = config.headers || {};
            config.headers["Content-Type"] = "application/json";

            return config;
        },
        (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor with improved error handling
    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retried?: boolean;
            };

            if (!originalRequest) {
                return Promise.reject(
                    new APIError("Network Error", "NETWORK_ERROR", 0)
                );
            }

            // Extract error details
            const status = error.response?.status || 0;
            const errorData = error.response?.data as any;
            const errorCode = errorData?.error?.code || "UNKNOWN_ERROR";
            const errorMessage =
                errorData?.error?.message || error.message || "Unknown error occurred";

            // Handle token expiration
            if (errorCode === "TOKEN_EXPIRED" && !originalRequest._retried) {
                originalRequest._retried = true;

                try {
                    await refreshAccessToken();
                    return instance(originalRequest);
                } catch (refreshError) {
                    // If token refresh fails, reject with a specific error
                    return Promise.reject(
                        new APIError("Authentication expired", "AUTH_REFRESH_FAILED", 401)
                    );
                }
            }

            // Return standardized error object
            return Promise.reject(new APIError(errorMessage, errorCode, status));
        }
    );

    return instance;
};

// Separated token refresh function with better error handling
const refreshAccessToken = async (): Promise<void> => {
    const refreshClient = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    try {
        await refreshClient.post("/auth/refresh");
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
    }
};

// API methods for common operations
export const httpClient = {
    instance: createAPIClient(),

    async get<T>(url: string, config?: any): Promise<T> {
        const response = await this.instance.get<T>(url, config);
        return response.data;
    },

    async post<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    },

    async put<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.instance.put<T>(url, data, config);
        return response.data;
    },

    async delete<T>(url: string, config?: any): Promise<T> {
        const response = await this.instance.delete<T>(url, config);
        return response.data;
    },

    async patch<T>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.instance.patch<T>(url, data, config);
        return response.data;
    },
};

export default httpClient;
