'use client';

import { CartItem } from '@/types';
import { useCart } from '@/context/CartContext';

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
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            {/* Medicine Image */}
            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                <img
                    src={item.medicine.image}
                    alt={item.medicine.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">
                    {item.medicine.name}
                </h3>
                <p className="text-sm text-gray-500">{item.medicine.manufacturer}</p>
                <p className="text-sm text-emerald-600 font-medium mt-1">
                    ₹{item.medicine.price.toFixed(2)} each
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </button>
                <span className="w-12 text-center font-medium text-gray-800">
                    {item.quantity}
                </span>
                <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={item.quantity >= item.medicine.stock}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${item.quantity >= item.medicine.stock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Subtotal */}
            <div className="text-right min-w-[80px]">
                <p className="text-lg font-bold text-gray-800">
                    ₹{(item.medicine.price * item.quantity).toFixed(2)}
                </p>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => removeFromCart(item.medicine.id)}
                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>
        </div>
    );
}
