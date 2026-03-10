'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CheckoutPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { items, getCartTotal, clearCart } = useCart();
    const { createOrder } = useStore();

    const [isProcessing, setIsProcessing] = useState(false);
    const [address, setAddress] = useState(user?.address || '');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const subtotal = getCartTotal();
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + tax + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 animate-fadeIn">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-8">Add some items to your cart to proceed with checkout.</p>
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

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 animate-fadeIn">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login to Checkout</h1>
                    <p className="text-gray-500 mb-8">You need to be logged in to complete your purchase.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 transition-all"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handlePlaceOrder = async () => {
        if (!address.trim()) {
            alert('Please enter a shipping address');
            return;
        }

        setIsProcessing(true);

        // Simulate order processing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const order = createOrder({
            userId: user.id,
            items: items,
            totalAmount: total,
            status: 'confirmed',
            shippingAddress: address,
            paymentMethod: paymentMethod,
        });

        clearCart();
        router.push(`/orders/${order.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8 animate-fadeIn">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/cart" className="p-2 hover:bg-white rounded-lg transition-colors">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                        <p className="text-gray-500">Complete your order</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Shipping Address
                            </h2>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full shipping address..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Payment Method
                            </h2>
                            <div className="space-y-3">
                                {[
                                    { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                                    { id: 'upi', label: 'UPI Payment', icon: '📱' },
                                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                                ].map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === method.id
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:border-emerald-200'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4 text-emerald-600"
                                        />
                                        <span className="text-2xl">{method.icon}</span>
                                        <span className="font-medium text-gray-800">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Order Items ({items.length})
                            </h2>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.medicine.id}
                                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 truncate">{item.medicine.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-gray-800">
                                            ₹{(item.medicine.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (8%)</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : `₹${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-800">
                                        <span>Total</span>
                                        <span className="text-emerald-600">₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <LoadingSpinner size="sm" color="white" />
                                        Processing Order...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Place Order
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                By placing this order, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
