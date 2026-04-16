'use client';

import { Medicine } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import MedicineImage from './MedicineImage';

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

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'Pain Relief': 'bg-orange-50 text-orange-600 border-orange-200',
            'Antibiotics': 'bg-rose-50 text-rose-600 border-rose-200',
            'Vitamins': 'bg-amber-50 text-amber-600 border-amber-200',
            'Cold & Flu': 'bg-sky-50 text-sky-600 border-sky-200',
            'Digestive Health': 'bg-emerald-50 text-emerald-600 border-emerald-200',
            'Skin Care': 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200',
            'First Aid': 'bg-red-50 text-red-600 border-red-200',
            'Wellness': 'bg-violet-50 text-violet-600 border-violet-200',
        };
        return colors[category] || 'bg-gray-50 text-gray-600 border-gray-200';
    };

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full card-hover">
            {/* Image */}
            <Link href={`/shop/${medicine.id}`} className="block relative overflow-hidden cursor-pointer">
                <MedicineImage category={medicine.category} name={medicine.name} size="md" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {medicine.requiresPrescription && (
                        <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Rx
                        </span>
                    )}
                    {medicine.stock < 20 && medicine.stock > 0 && (
                        <span className="px-2.5 py-1 bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-sm">
                            Low Stock
                        </span>
                    )}
                    {medicine.stock === 0 && (
                        <span className="px-2.5 py-1 bg-gray-800 text-white text-xs font-semibold rounded-lg shadow-sm">
                            Sold Out
                        </span>
                    )}
                </div>

                {/* Success Overlay */}
                {showSuccess && (
                    <div className="absolute inset-0 bg-emerald-500/90 flex items-center justify-center animate-fadeIn z-20">
                        <div className="text-white text-center">
                            <svg className="w-10 h-10 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="font-semibold text-sm">Added to Cart!</p>
                        </div>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                {/* Category */}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border mb-3 self-start ${getCategoryColor(medicine.category)}`}>
                    {medicine.category}
                </span>

                {/* Title */}
                <Link href={`/shop/${medicine.id}`} className="block mb-1.5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors leading-snug">
                        {medicine.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">
                    {medicine.description}
                </p>

                {/* Manufacturer */}
                <p className="text-xs text-gray-400 mb-4">
                    {medicine.manufacturer}
                </p>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                    <span className="text-xl font-bold text-gray-900">
                        &#8377;{medicine.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        disabled={medicine.stock === 0 || isAdding}
                        className={`px-3.5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${medicine.stock === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-sm hover:shadow-md'
                            }`}
                    >
                        {isAdding ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                {medicine.stock === 0 ? 'Sold Out' : 'Add'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
