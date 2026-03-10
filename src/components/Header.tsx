'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
    const { user, logout, isAdmin } = useAuth();
    const { getCartCount } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const cartCount = getCartCount();

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:shadow-emerald-300 transition-shadow">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            PharmaCare
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                        >
                            Shop
                        </Link>
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                            >
                                Admin
                            </Link>
                        )}
                        {user && (
                            <Link
                                href="/orders"
                                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                            >
                                My Orders
                            </Link>
                        )}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.role}</p>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-emerald-100 animate-fadeIn">
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/shop"
                                className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Shop
                            </Link>
                            {isAdmin && (
                                <Link
                                    href="/admin"
                                    className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Admin
                                </Link>
                            )}
                            {user && (
                                <Link
                                    href="/orders"
                                    className="px-4 py-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    My Orders
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
