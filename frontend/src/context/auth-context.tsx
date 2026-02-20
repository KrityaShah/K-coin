"use client";

import { useRouter } from "next/navigation";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { fetchWrapper } from "@/lib/fetch-wrapper";
import { toast } from "sonner";

export interface User {
    _id: string;
    email: string;
    walletAddress: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    isLoading: boolean;
    userAuthentication: () => Promise<User | null>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const userAuthentication = useCallback(async (): Promise<User | null> => {
        setIsLoading(true);
        try {
            const response = await fetchWrapper.get<{ user: User }>('/user/me');
            setUser(response.user);
            setIsLoggedIn(true);
            return response.user;
        } catch (error: any) {
            if (error.status === 401) {
                setUser(null);
                setIsLoggedIn(false);
            } else {
                console.error('Unexpected auth error:', error);
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        userAuthentication();
    }, [userAuthentication]);

    const logout = async () => {
        try {
            await fetchWrapper.post('/auth/logout', {});
            setUser(null);
            setIsLoggedIn(false);
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            user,
            isLoading,
            userAuthentication,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};