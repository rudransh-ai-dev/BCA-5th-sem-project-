'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItemCard from '@/components/CartItemCard';

export default function CartPage() {
    const { items, getCartTotal, clearCart } = useCart();
    const subtotal = getCartTotal();
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + tax + shipping;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 animate-fadeIn">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-8">
                        Looks like you haven&apos;t added any medicines to your cart yet.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8 animate-fadeIn">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
                        <p className="text-gray-500">{items.length} item{items.length > 1 ? 's' : ''} in your cart</p>
                    </div>
                    <button
                        onClick={clearCart}
                        className="px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear Cart
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <CartItemCard key={item.medicine.id} item={item} />
                        ))}
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
                                    <span>
                                        {shipping === 0 ? (
                                            <span className="text-emerald-600">Free</span>
                                        ) : (
                                            `₹${shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-sm text-gray-500">
                                        Add ₹{(50 - subtotal).toFixed(2)} more for free shipping
                                    </p>
                                )}
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-800">
                                        <span>Total</span>
                                        <span className="text-emerald-600">₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                Proceed to Checkout
                            </Link>

                            <Link
                                href="/shop"
                                className="w-full mt-4 py-3 text-emerald-600 font-medium hover:bg-emerald-50 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
