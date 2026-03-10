'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Medicine, Order, Bill } from '@/types';
import { sampleMedicines } from '@/data/medicines';

interface StoreContextType {
    medicines: Medicine[];
    orders: Order[];
    addMedicine: (medicine: Omit<Medicine, 'id'>) => void;
    updateMedicine: (id: string, medicine: Partial<Medicine>) => void;
    deleteMedicine: (id: string) => void;
    createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Order;
    getOrderById: (orderId: string) => Order | undefined;
    getUserOrders: (userId: string) => Order[];
    generateBill: (orderId: string) => Bill | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [medicines, setMedicines] = useState<Medicine[]>(sampleMedicines);
    const [orders, setOrders] = useState<Order[]>([]);

    const addMedicine = (medicine: Omit<Medicine, 'id'>) => {
        const newMedicine: Medicine = {
            ...medicine,
            id: `med-${Date.now()}`,
        };
        setMedicines((prev) => [...prev, newMedicine]);
    };

    const updateMedicine = (id: string, updates: Partial<Medicine>) => {
        setMedicines((prev) =>
            prev.map((med) => (med.id === id ? { ...med, ...updates } : med))
        );
    };

    const deleteMedicine = (id: string) => {
        setMedicines((prev) => prev.filter((med) => med.id !== id));
    };

    const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
        const newOrder: Order = {
            ...orderData,
            id: `ORD-${Date.now()}`,
            createdAt: new Date(),
        };
        setOrders((prev) => [...prev, newOrder]);

        // Update stock for each item
        orderData.items.forEach((item) => {
            updateMedicine(item.medicine.id, {
                stock: item.medicine.stock - item.quantity,
            });
        });

        return newOrder;
    };

    const getOrderById = (orderId: string): Order | undefined => {
        return orders.find((order) => order.id === orderId);
    };

    const getUserOrders = (userId: string): Order[] => {
        return orders.filter((order) => order.userId === userId);
    };

    const generateBill = (orderId: string): Bill | null => {
        const order = getOrderById(orderId);
        if (!order) return null;

        const items = order.items.map((item) => ({
            name: item.medicine.name,
            quantity: item.quantity,
            unitPrice: item.medicine.price,
            totalPrice: item.medicine.price * item.quantity,
        }));

        const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50

        return {
            orderId: order.id,
            items,
            subtotal,
            tax,
            shipping,
            grandTotal: subtotal + tax + shipping,
            generatedAt: new Date(),
        };
    };

    return (
        <StoreContext.Provider
            value={{
                medicines,
                orders,
                addMedicine,
                updateMedicine,
                deleteMedicine,
                createOrder,
                getOrderById,
                getUserOrders,
                generateBill,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
