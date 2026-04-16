'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';

export default function OrdersPage() {
    const { user } = useAuth();
    const { getUserOrders } = useStore();

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 animate-fadeIn">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
                    <p className="text-gray-500 mb-8">You need to be logged in to view your orders.</p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    const orders = getUserOrders(user.id);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-emerald-100 text-emerald-700';
            case 'shipped':
                return 'bg-blue-100 text-blue-700';
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'cancelled':
                return 'bg-rose-100 text-rose-700';
            default:
                return 'bg-amber-100 text-amber-700';
        }
    };

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 animate-fadeIn">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h1>
                    <p className="text-gray-500 mb-8">You haven&apos;t placed any orders yet. Start shopping now!</p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8 animate-fadeIn">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
                    <p className="text-gray-500">Track and manage your orders</p>
                </div>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            href={`/orders/${order.id}`}
                            className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-emerald-600">&#8377;{order.totalAmount.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex flex-wrap gap-2">
                                    {order.items.slice(0, 3).map((item) => (
                                        <span
                                            key={item.medicine.id}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                        >
                                            {item.medicine.name} × {item.quantity}
                                        </span>
                                    ))}
                                    {order.items.length > 3 && (
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                                            +{order.items.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center text-emerald-600 font-medium">
                                <span>View Details</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
