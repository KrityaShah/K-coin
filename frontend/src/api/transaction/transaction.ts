import { fetchWrapper } from '@/lib/fetch-wrapper';
import { useQuery } from '@tanstack/react-query';

export interface PendingTransaction {
    _id: string;
    sender: string;
    recipient: string;
    amount: number;
    status: string;
    createdAt: string;
}

const getPendingTransactions = async (): Promise<PendingTransaction[]> => {
    return fetchWrapper.get<PendingTransaction[]>('/transactions/pending');
};

export function usePendingTransactions() {
    return useQuery({
        queryKey: ['transactions', 'pending'],
        queryFn: getPendingTransactions,
    });
}