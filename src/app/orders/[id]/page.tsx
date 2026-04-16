'use client';

import { use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const { getOrderById, generateBill } = useStore();

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 animate-fadeIn">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
                    <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl">Login</Link>
                </div>
            </div>
        );
    }

    const order = getOrderById(id);
    const bill = order ? generateBill(order.id) : null;

    if (!order || !bill) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 animate-fadeIn">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
                    <Link href="/orders" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl">View All Orders</Link>
                </div>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            confirmed: 'bg-emerald-100 text-emerald-700',
            shipped: 'bg-blue-100 text-blue-700',
            delivered: 'bg-green-100 text-green-700',
            cancelled: 'bg-rose-100 text-rose-700',
        };
        return colors[status] || 'bg-amber-100 text-amber-700';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8 animate-fadeIn">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/orders" className="p-2 hover:bg-white rounded-lg">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Order #{order.id}</h1>
                        <p className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`ml-auto px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.medicine.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.medicine.name}</h3>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity} &times; &#8377;{item.medicine.price.toFixed(2)}</p>
                                        </div>
                                        <p className="font-bold">&#8377;{(item.medicine.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
                            <p className="text-gray-600">{order.shippingAddress}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Bill Summary</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span>Subtotal</span><span>&#8377;{bill.subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Tax (8%)</span><span>&#8377;{bill.tax.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Shipping</span><span>{bill.shipping === 0 ? 'Free' : `₹${bill.shipping.toFixed(2)}`}</span></div>
                            <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                <span>Total</span><span className="text-emerald-600">&#8377;{bill.grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={() => window.print()} className="w-full mt-6 py-3 bg-emerald-50 text-emerald-600 font-medium rounded-xl hover:bg-emerald-100">
                            Print Bill
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
