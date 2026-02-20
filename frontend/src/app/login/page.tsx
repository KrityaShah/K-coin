import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
            <div className="relative">
                <LoginForm />
            </div>
        </div>
    );
}