"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import WalletCard from "./components/wallet-card";
import MineCard from "./components/mine-card";
import SendTransactionForm from "./components/send-transaction-form";

export default function DashboardPage() {
    const { isLoading, isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoading, isLoggedIn, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
            <div className="relative max-w-6xl mx-auto px-6 py-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WalletCard />
                    <MineCard />
                </div>
                <SendTransactionForm />
            </div>
        </div>
    );
}