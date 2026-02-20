import { z } from 'zod';
import { fetchWrapper } from '@/lib/fetch-wrapper';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
});

const loginResponseSchema = z.object({
    message: z.string(),
    user: z.object({
        _id: z.string(),
        email: z.string(),
        walletAddress: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

const login = async (data: LoginInput): Promise<LoginResponse> => {
    const response = await fetchWrapper.post<LoginResponse>('/auth/login', data);
    return loginResponseSchema.parse(response);
};

export function useLogin(): UseMutationResult<LoginResponse, Error, LoginInput> {
    const { userAuthentication } = useAuth();
    const router = useRouter();

    return useMutation({
        mutationFn: login,
        onSuccess: async () => {
            await userAuthentication();
            toast.success('Logged in successfully!');
            router.push('/dashboard');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Login failed');
        },
    });
}