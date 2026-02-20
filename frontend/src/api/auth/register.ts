import { z } from 'zod';
import { fetchWrapper } from '@/lib/fetch-wrapper';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const registerSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerResponseSchema = z.object({
    message: z.string(),
    user: z.object({
        _id: z.string(),
        email: z.string(),
        walletAddress: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;

const register = async (data: RegisterInput): Promise<RegisterResponse> => {
    const response = await fetchWrapper.post<RegisterResponse>('/auth/register', data);
    return registerResponseSchema.parse(response);
};

export function useRegister(): UseMutationResult<RegisterResponse, Error, RegisterInput> {
    const { userAuthentication } = useAuth();
    const router = useRouter();

    return useMutation({
        mutationFn: register,
        onSuccess: async () => {
            await userAuthentication();
            toast.success('Registered successfully!');
            router.push('/dashboard');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Registration failed');
        },
    });
}