"use client";

import { useMineBlock } from "@/api/block/block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MineCard() {
    const { mutate: mine, isPending: mining } = useMineBlock();

    return (
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-600" />
            <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    Mining
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="text-white font-semibold">Mine a New Block</p>
                    <p className="text-zinc-500 text-sm mt-1">
                        Confirm pending transactions and earn 10 KCoin as a reward.
                    </p>
                </div>
                <Button
                    onClick={() => mine()}
                    disabled={mining}
                    className="w-full h-11 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all duration-200"
                >
                    {mining ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Mining block...
                        </span>
                    ) : (
                        "Mine New Block"
                    )}
                </Button>
                {mining && (
                    <p className="text-zinc-500 text-xs text-center animate-pulse">
                        Running proof of work, this may take a moment...
                    </p>
                )}
            </CardContent>
        </Card>
    );
}