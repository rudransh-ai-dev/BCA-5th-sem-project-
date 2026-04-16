'use client';

import { CartItem } from '@/types';
import { useCart } from '@/context/CartContext';
import MedicineImage from './MedicineImage';

interface CartItemCardProps {
    item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
    const { updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(item.medicine.id);
        } else if (newQuantity <= item.medicine.stock) {
            updateQuantity(item.medicine.id, newQuantity);
        }
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
            {/* Medicine Image */}
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <MedicineImage category={item.medicine.category} name={item.medicine.name} size="sm" className="!w-16 !h-16" />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                    {item.medicine.name}
                </h3>
                <p className="text-sm text-gray-500">{item.medicine.manufacturer}</p>
                <p className="text-sm text-emerald-600 font-medium mt-0.5">
                    &#8377;{item.medicine.price.toFixed(2)} each
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors border border-gray-200"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                    </svg>
                </button>
                <span className="w-10 text-center font-semibold text-gray-900 text-sm">
                    {item.quantity}
                </span>
                <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={item.quantity >= item.medicine.stock}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${item.quantity >= item.medicine.stock
                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200'
                        }`}
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Subtotal */}
            <div className="text-right min-w-[80px]">
                <p className="text-lg font-bold text-gray-900">
                    &#8377;{(item.medicine.price * item.quantity).toFixed(2)}
                </p>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => removeFromCart(item.medicine.id)}
                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="Remove item"
            >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
