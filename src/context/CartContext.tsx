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

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('pharmacy_cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
        setIsInitialized(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('pharmacy_cart', JSON.stringify(items));
        }
    }, [items, isInitialized]);

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
