'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated users database
const usersDb: { user: User; password: string }[] = [
    {
        user: {
            id: 'admin-1',
            name: 'Admin User',
            email: 'admin@pharmacy.com',
            role: 'admin',
            phone: '123-456-7890',
            address: '123 Admin Street',
        },
        password: 'admin123',
    },
    {
        user: {
            id: 'user-1',
            name: 'Ajay sir',
            email: 'ajaysir@example.com',
            role: 'user',
            phone: '987-654-3210',
            address: '456 User Lane',
        },
        password: 'user123',
    },
];

function getInitialUser(): User | null {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('pharmacy_user');
    if (savedUser) {
        try {
            return JSON.parse(savedUser);
        } catch {
            return null;
        }
    }
    return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(getInitialUser);
    const [isLoading] = useState(false);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const found = usersDb.find(
            (u) => u.user.email === email && u.password === password
        );

        if (found) {
            setUser(found.user);
            localStorage.setItem('pharmacy_user', JSON.stringify(found.user));
            return true;
        }
        return false;
    };

    const register = async (
        name: string,
        email: string,
        password: string
    ): Promise<boolean> => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if email already exists
        const exists = usersDb.find((u) => u.user.email === email);
        if (exists) {
            return false;
        }

        // Create new user
        const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            role: 'user',
        };

        usersDb.push({ user: newUser, password });
        setUser(newUser);
        localStorage.setItem('pharmacy_user', JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pharmacy_user');
    };

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, register, logout, isAdmin }}
        >
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
