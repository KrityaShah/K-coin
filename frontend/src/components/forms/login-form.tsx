"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput, useLogin } from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

export default function LoginForm() {
    const { mutate: login, isPending } = useLogin();

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginInput) => {
        login(data);
    };

    return (
        <div className="w-full max-w-md">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400 mb-6">
                    <span className="text-2xl font-black text-zinc-950">K</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                    Welcome back
                </h1>
                <p className="text-zinc-500 mt-2 text-sm">
                    Sign in to your KCoin account
                </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="you@example.com"
                                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-amber-400 focus-visible:border-amber-400 h-11 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="••••••••"
                                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-amber-400 focus-visible:border-amber-400 h-11 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-xs" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-11 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl transition-all duration-200 mt-2"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>

            <p className="text-center text-zinc-600 text-sm mt-6">
                Don't have an account?{" "}
                <Link
                    href="/register"
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                    Create one
                </Link>
            </p>
        </div>
    );
}