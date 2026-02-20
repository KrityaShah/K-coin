import { fetchWrapper } from '@/lib/fetch-wrapper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

const walletSchema = z.object({
    walletAddress: z.string(),
    balance: z.number(),
});

export const sendTransactionSchema = z.object({
    recipient: z.string().min(1, 'Recipient address is required'),
    amount: z.number().positive('Amount must be greater than 0'),
});

export type WalletData = z.infer<typeof walletSchema>;
export type SendTransactionInput = z.infer<typeof sendTransactionSchema>;

const getWallet = async (): Promise<WalletData> => {
    const response = await fetchWrapper.get<WalletData>('/user/wallet');
    return walletSchema.parse(response);
};

const sendTransaction = async (data: SendTransactionInput) => {
    return fetchWrapper.post('/transactions', data);
};

export function useWallet() {
    return useQuery({
        queryKey: ['wallet'],
        queryFn: getWallet,
    });
}

export function useSendTransaction() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
            toast.success('Transaction sent!');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Transaction failed');
        },
    });
}