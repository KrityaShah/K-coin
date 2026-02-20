"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput, useRegister } from "@/api/auth/register";
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

export default function RegisterForm() {
    const { mutate: register, isPending } = useRegister();

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: RegisterInput) => {
        register(data);
    };

    return (
        <div className="w-full max-w-md">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400 mb-6">
                    <span className="text-2xl font-black text-zinc-950">K</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                    Create account
                </h1>
                <p className="text-zinc-500 mt-2 text-sm">
                    Join KCoin and get your wallet instantly
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

                        <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl px-4 py-3">
                            <p className="text-amber-400/80 text-xs">
                                🪙 A unique KCoin wallet address will be generated for you automatically on registration.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-11 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl transition-all duration-200 mt-2"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                                    Creating account...
                                </span>
                            ) : (
                                "Create account"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>

            <p className="text-center text-zinc-600 text-sm mt-6">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}