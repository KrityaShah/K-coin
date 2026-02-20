"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendTransactionSchema, SendTransactionInput, useSendTransaction } from "@/api/wallet/wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function SendTransactionForm() {
    const { mutate: sendTx, isPending: sendingTx } = useSendTransaction();

    const form = useForm<SendTransactionInput>({
        resolver: zodResolver(sendTransactionSchema),
        defaultValues: {
            recipient: "",
            amount: 0,
        },
    });

    const onSubmit = (data: SendTransactionInput) => {
        sendTx(data, {
            onSuccess: () => form.reset(),
        });
    };

    return (
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-400 to-violet-600" />
            <CardHeader className="pb-2">
                <CardTitle className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    Send KCoin
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="recipient"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                                            Recipient Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="0x..."
                                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-400 focus-visible:border-blue-400 h-11 rounded-xl font-mono text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                                            Amount (KC)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="0"
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-400 focus-visible:border-blue-400 h-11 rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={sendingTx}
                            className="h-11 px-8 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-all duration-200"
                        >
                            {sendingTx ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Sending...
                                </span>
                            ) : (
                                "Send KCoin →"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}