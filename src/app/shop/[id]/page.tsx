'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { Medicine } from '@/types';

export default function ProductDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { medicines } = useStore();
    const { addToCart } = useCart();
    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (params.id) {
            const found = medicines.find((m) => m.id === params.id);
            if (found) {
                setMedicine(found);
            }
        }
    }, [params.id, medicines]);

    if (!medicine) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    const handleAddToCart = () => {
        setIsAdding(true);
        setTimeout(() => {
            addToCart(medicine, quantity);
            setIsAdding(false);
            // Optional: Show toast or feedback
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Shop
                </button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative h-96 lg:h-auto bg-gray-100">
                            <img
                                src={medicine.image}
                                alt={medicine.name}
                                className="w-full h-full object-cover"
                            />
                            {medicine.requiresPrescription && (
                                <div className="absolute top-6 left-6 px-4 py-2 bg-amber-500 text-white font-semibold rounded-full shadow-lg flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Prescription Required
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 font-medium rounded-full mb-4">
                                    {medicine.category}
                                </span>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                    {medicine.name}
                                </h1>
                                <p className="text-lg text-gray-500 font-medium">
                                    By {medicine.manufacturer}
                                </p>
                            </div>

                            <div className="prose prose-lg text-gray-600 mb-8">
                                <p>{medicine.description}</p>
                            </div>

                            <div className="border-t border-gray-100 py-8 mb-8">
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold text-emerald-600">
                                        ₹{medicine.price.toFixed(2)}
                                    </span>
                                    <span className="text-gray-400 mb-2">/ unit</span>
                                </div>
                                <p className={`text-sm font-medium ${medicine.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {medicine.stock > 0 ? `In Stock (${medicine.stock} units)` : 'Out of Stock'}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-gray-600 hover:text-emerald-600 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(medicine.stock, quantity + 1))}
                                        className="px-4 py-3 text-gray-600 hover:text-emerald-600 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={medicine.stock === 0 || isAdding}
                                    className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${medicine.stock > 0
                                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {isAdding ? (
                                        <>
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
