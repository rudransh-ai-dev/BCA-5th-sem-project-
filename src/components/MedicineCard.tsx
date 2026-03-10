'use client';

import { Medicine } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';

interface MedicineCardProps {
    medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        setTimeout(() => {
            addToCart(medicine, 1);
            setIsAdding(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }, 300);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Pain Relief':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            case 'Antibiotics':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                );
            case 'Vitamins':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                );
            case 'Cold & Flu':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                );
            case 'First Aid':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                );
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Pain Relief':
                return 'bg-orange-100 text-orange-600';
            case 'Antibiotics':
                return 'bg-rose-100 text-rose-600';
            case 'Vitamins':
                return 'bg-amber-100 text-amber-600';
            case 'Cold & Flu':
                return 'bg-blue-100 text-blue-600';
            case 'Digestive Health':
                return 'bg-green-100 text-green-600';
            case 'Skin Care':
                return 'bg-pink-100 text-pink-600';
            case 'First Aid':
                return 'bg-red-100 text-red-600';
            case 'Wellness':
                return 'bg-purple-100 text-purple-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200 flex flex-col h-full">
            {/* Image Link */}
            <Link href={`/shop/${medicine.id}`} className="block relative h-48 bg-white overflow-hidden cursor-pointer">
                <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Prescription Badge */}
                {medicine.requiresPrescription && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full flex items-center gap-1 z-10">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Rx Required
                    </div>
                )}

                {/* Stock Badge */}
                {medicine.stock < 20 && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded-full z-10">
                        Low Stock
                    </div>
                )}

                {/* Success Overlay */}
                {showSuccess && (
                    <div className="absolute inset-0 bg-emerald-500/90 flex items-center justify-center animate-fadeIn z-20">
                        <div className="text-white text-center">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="font-medium">Added to Cart!</p>
                        </div>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Category */}
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-3 self-start ${getCategoryColor(medicine.category)}`}>
                    {getCategoryIcon(medicine.category)}
                    {medicine.category}
                </div>

                {/* Title Link */}
                <Link href={`/shop/${medicine.id}`} className="block mb-2">
                    <h3 className="font-bold text-xl text-gray-800 group-hover:text-emerald-600 transition-colors">
                        {medicine.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {medicine.description}
                </p>

                {/* Manufacturer */}
                <p className="text-xs text-gray-400 mb-4">
                    By {medicine.manufacturer}
                </p>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-2xl font-bold text-emerald-600">
                            ₹{medicine.price.toFixed(2)}
                        </span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={medicine.stock === 0 || isAdding}
                        className={`px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${medicine.stock === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-200 active:scale-95'
                            }`}
                    >
                        {isAdding ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {medicine.stock === 0 ? 'Out of Stock' : 'Add'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
