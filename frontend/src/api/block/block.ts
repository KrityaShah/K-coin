import { fetchWrapper } from '@/lib/fetch-wrapper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface Transaction {
    _id: string;
    sender: string;
    recipient: string;
    amount: number;
    status: string;
    createdAt: string;
}

export interface Block {
    _id: string;
    index: number;
    previousHash: string;
    hash: string;
    nonce: number;
    transactions: Transaction[];
    createdAt: string;
}

const getChain = async (): Promise<Block[]> => {
    return fetchWrapper.get<Block[]>('/block/chain');
};

const mineBlock = async (): Promise<Block> => {
    return fetchWrapper.post<Block>('/block/mine', {});
};

export function useChain() {
    return useQuery({
        queryKey: ['chain'],
        queryFn: getChain,
    });
}

export function useMineBlock() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mineBlock,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
            queryClient.invalidateQueries({ queryKey: ['chain'] });
            toast.success('Block mined! +10 KCoin rewarded');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Mining failed');
        },
    });
}