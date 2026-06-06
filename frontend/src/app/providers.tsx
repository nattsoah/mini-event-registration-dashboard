'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (credentials: Record<string, string>) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchUser = async () => {
        try {
            // Use the silent auth-check to avoid 401 console errors on initial load
            const response = await api.get('/api/auth-check');
            if (response.data.authenticated) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        await api.get('/sanctum/csrf-cookie');
        await api.post('/login', credentials);
        await fetchUser();
        router.push('/dashboard');
    };

    const logout = async () => {
        await api.post('/logout');
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
