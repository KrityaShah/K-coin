"use client";

import { useWallet } from "@/api/wallet/wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WalletCard() {
    const { data: wallet, isLoading } = useWallet();

    return (
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
            <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    Wallet
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-32 bg-zinc-800" />
                        <Skeleton className="h-4 w-full bg-zinc-800" />
                    </div>
                ) : (
                    <>
                        <div>
                            <p className="text-zinc-500 text-xs mb-1">Balance</p>
                            <p className="text-4xl font-black text-white">
                                {wallet?.balance ?? 0}
                                <span className="text-amber-400 text-xl ml-2">KC</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs mb-1">Wallet Address</p>
                            <p className="text-zinc-300 text-xs font-mono break-all bg-zinc-800 rounded-lg px-3 py-2">
                                {wallet?.walletAddress}
                            </p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}