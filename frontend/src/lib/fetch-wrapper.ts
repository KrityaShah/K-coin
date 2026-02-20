import axios, { AxiosError, AxiosInstance } from 'axios';

export interface FetchError extends Error {
    status?: number;
    data?: any;
}

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const request = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: unknown,
): Promise<T> => {
    try {
        const res = await apiClient({
            method: method.toLowerCase() as any,
            url,
            data: body,
        });
        return res.data;
    } catch (err) {
        const axiosError = err as AxiosError;
        const error: FetchError = new Error();

        if (axiosError.response) {
            error.status = axiosError.response.status;
            error.data = axiosError.response.data;
            error.message = (axiosError.response.data as any)?.message || 'API Error';
        } else {
            error.message = 'Network error or server not reachable';
        }

        throw error;
    }
};

export const fetchWrapper = {
    get: <T>(url: string) => request<T>('GET', url),
    post: <T>(url: string, body: unknown) => request<T>('POST', url, body),
    put: <T>(url: string, body: unknown) => request<T>('PUT', url, body),
    delete: <T>(url: string) => request<T>('DELETE', url),
};