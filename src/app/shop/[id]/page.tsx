'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import MedicineImage from '@/components/MedicineImage';

export default function ProductDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { medicines } = useStore();
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [addedSuccess, setAddedSuccess] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const medicine = medicines.find((m) => m.id === params.id);

    if (!medicine) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 mb-4">Product not found</p>
                    <Link href="/shop" className="text-emerald-600 font-medium hover:underline">Back to Shop</Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        setIsAdding(true);
        setTimeout(() => {
            addToCart(medicine, quantity);
            setIsAdding(false);
            setAddedSuccess(true);
            setTimeout(() => setAddedSuccess(false), 2500);
        }, 400);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 animate-fadeIn">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-900 font-medium">{medicine.name}</span>
                </nav>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="grid lg:grid-cols-2">
                        {/* Image Section */}
                        <MedicineImage category={medicine.category} name={medicine.name} size="lg" />

                        {/* Details Section */}
                        <div className="p-8 lg:p-10 flex flex-col justify-center">
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg">
                                        {medicine.category}
                                    </span>
                                    {medicine.requiresPrescription && (
                                        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-lg flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Rx Required
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                                    {medicine.name}
                                </h1>
                                <p className="text-gray-500">
                                    By {medicine.manufacturer}
                                </p>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                {medicine.description}
                            </p>

                            <div className="border-t border-gray-100 pt-6 mb-6">
                                <div className="flex items-end gap-2 mb-1.5">
                                    <span className="text-3xl font-bold text-gray-900">
                                        &#8377;{medicine.price.toFixed(2)}
                                    </span>
                                    <span className="text-gray-400 text-sm mb-1">/ unit</span>
                                </div>
                                <p className={`text-sm font-medium ${medicine.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {medicine.stock > 0 ? `In Stock (${medicine.stock} units available)` : 'Out of Stock'}
                                </p>
                            </div>

                            {/* Success message */}
                            {addedSuccess && (
                                <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2 text-sm font-medium animate-fadeIn">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Added {quantity} item{quantity > 1 ? 's' : ''} to cart!
                                    <Link href="/cart" className="ml-auto underline">View Cart</Link>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex items-center border border-gray-200 rounded-xl">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-xl transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(medicine.stock, quantity + 1))}
                                        className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-xl transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={medicine.stock === 0 || isAdding}
                                    className={`flex-1 px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${medicine.stock > 0
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md active:scale-[0.98]'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {isAdding ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            {medicine.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
