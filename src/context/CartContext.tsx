'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Medicine } from '@/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (medicine: Medicine, quantity?: number) => void;
    removeFromCart: (medicineId: string) => void;
    updateQuantity: (medicineId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getInitialCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const savedCart = localStorage.getItem('pharmacy_cart');
    if (savedCart) {
        try {
            return JSON.parse(savedCart);
        } catch {
            return [];
        }
    }
    return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(getInitialCart);

    useEffect(() => {
        localStorage.setItem('pharmacy_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (medicine: Medicine, quantity: number = 1) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.medicine.id === medicine.id
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.medicine.id === medicine.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevItems, { medicine, quantity }];
        });
    };

    const removeFromCart = (medicineId: string) => {
        setItems((prevItems) =>
            prevItems.filter((item) => item.medicine.id !== medicineId)
        );
    };

    const updateQuantity = (medicineId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(medicineId);
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.medicine.id === medicineId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getCartTotal = () => {
        return items.reduce(
            (total, item) => total + item.medicine.price * item.quantity,
            0
        );
    };

    const getCartCount = () => {
        return items.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
