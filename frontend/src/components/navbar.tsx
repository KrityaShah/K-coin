"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

const HIDE_NAVBAR_ROUTES = ["/login", "/register"];

export default function Navbar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const router = useRouter();

    if (HIDE_NAVBAR_ROUTES.includes(pathname)) return null;

    return (
        <nav className="border-b border-zinc-800 bg-black backdrop-blur-sm sticky top-0 z-10">
            <div className="h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                >
                    <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                        <span className="text-sm font-black text-zinc-950">K</span>
                    </div>
                    <span className="text-white font-bold text-lg">KCoin</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-zinc-500 text-sm hidden sm:block">
                        {user?.email}
                    </span>
                    <Button
                        onClick={() => router.push("/dashboard")}
                        variant="ghost"
                        className={`text-sm h-9 transition-colors ${
                            pathname === "/dashboard"
                                ? "text-amber-400 hover:text-amber-300 hover:bg-zinc-800"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        }`}
                    >
                        Dashboard
                    </Button>
                    <Button
                        onClick={() => router.push("/explorer")}
                        variant="ghost"
                        className={`text-sm h-9 transition-colors ${
                            pathname === "/explorer"
                                ? "text-amber-400 hover:text-amber-300 hover:bg-zinc-800"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        }`}
                    >
                        Explorer
                    </Button>
                    <Button
                        onClick={logout}
                        variant="ghost"
                        className="text-zinc-500 hover:text-red-400 hover:bg-zinc-800 text-sm h-9 transition-colors"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </nav>
    );
}