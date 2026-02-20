"use client";

import { useChain } from "@/api/block/block";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExplorerPage() {
    const { data: chain, isLoading } = useChain();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-zinc-950">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        Blockchain Explorer
                    </h1>
                    <p className="text-zinc-500 mt-2 text-sm">
                        {isLoading ? "Loading..." : `${chain?.length ?? 0} blocks on the chain`}
                    </p>
                </div>

                {isLoading && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-48 w-full bg-zinc-900 rounded-2xl" />
                        ))}
                    </div>
                )}

                {!isLoading && (!chain || chain.length === 0) && (
                    <div className="text-center py-24">
                        <p className="text-zinc-600 text-lg">No blocks mined yet.</p>
                        <p className="text-zinc-700 text-sm mt-2">
                            Go to the dashboard and mine the first block.
                        </p>
                        <Button
                            onClick={() => router.push("/dashboard")}
                            className="mt-6 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl"
                        >
                            Go Mine →
                        </Button>
                    </div>
                )}

                {!isLoading && chain && chain.length > 0 && (
                    <div className="space-y-4">
                        {[...chain].reverse().map((block, i) => (
                            <div key={block._id} className="relative">
                                {i < chain.length - 1 && (
                                    <div className="absolute left-8 -bottom-4 w-px h-4 bg-zinc-700 z-10" />
                                )}

                                <Card className="bg-zinc-900 border-zinc-800 rounded-2xl overflow-hidden">
                                    <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between flex-wrap gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                                                    <span className="text-amber-400 font-black text-sm">
                                                        #{block.index}
                                                    </span>
                                                </div>
                                                <div>
                                                    <CardTitle className="text-white text-base font-bold">
                                                        Block {block.index}
                                                    </CardTitle>
                                                    <p className="text-zinc-600 text-xs mt-0.5">
                                                        {new Date(block.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700 text-xs">
                                                    Nonce: {block.nonce}
                                                </Badge>
                                                <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700 text-xs">
                                                    {block.transactions.length} tx
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="bg-zinc-800 rounded-xl p-3">
                                                <p className="text-zinc-500 text-xs mb-1 font-semibold uppercase tracking-wider">
                                                    Hash
                                                </p>
                                                <p className="text-emerald-400 font-mono text-xs break-all">
                                                    {block.hash}
                                                </p>
                                            </div>
                                            <div className="bg-zinc-800 rounded-xl p-3">
                                                <p className="text-zinc-500 text-xs mb-1 font-semibold uppercase tracking-wider">
                                                    Previous Hash
                                                </p>
                                                <p className="text-zinc-500 font-mono text-xs break-all">
                                                    {block.previousHash}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">
                                                Transactions
                                            </p>
                                            <div className="space-y-2">
                                                {block.transactions.map((tx, txIndex) => (
                                                    <div
                                                        key={txIndex}
                                                        className="bg-zinc-800 rounded-xl p-3 flex items-center justify-between flex-wrap gap-2"
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            {tx.sender === "00" ? (
                                                                <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 text-xs shrink-0">
                                                                    Coinbase
                                                                </Badge>
                                                            ) : (
                                                                <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/20 text-xs shrink-0">
                                                                    Transfer
                                                                </Badge>
                                                            )}
                                                            <div className="min-w-0">
                                                                <p className="text-zinc-400 text-xs font-mono truncate">
                                                                    {tx.sender === "00" ? "System" : tx.sender}
                                                                </p>
                                                                <p className="text-zinc-600 text-xs">→</p>
                                                                <p className="text-zinc-400 text-xs font-mono truncate">
                                                                    {tx.recipient}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <p className="text-white font-bold text-sm">
                                                                {tx.amount}
                                                                <span className="text-amber-400 text-xs ml-1">KC</span>
                                                            </p>
                                                            <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 text-xs mt-1">
                                                                {tx.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}