'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
    const { user, logout, isAdmin } = useAuth();
    const { getCartCount } = useCart();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const cartCount = getCartCount();

    const isActive = (path: string) => pathname === path;

    const navLinkClass = (path: string) =>
        `text-sm font-medium transition-colors ${isActive(path)
            ? 'text-emerald-600'
            : 'text-gray-600 hover:text-gray-900'
        }`;

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-white"
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
                        <span className="text-lg font-bold text-gray-900">
                            PharmaCare
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className={navLinkClass('/')}>
                            Home
                        </Link>
                        <Link href="/shop" className={navLinkClass('/shop')}>
                            Shop
                        </Link>
                        {isAdmin && (
                            <Link href="/admin" className={navLinkClass('/admin')}>
                                Admin
                            </Link>
                        )}
                        {user && (
                            <Link href="/orders" className={navLinkClass('/orders')}>
                                My Orders
                            </Link>
                        )}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        {/* Cart */}
                        <Link
                            href="/cart"
                            className={`relative p-2 rounded-lg transition-colors ${isActive('/cart') ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-emerald-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold min-w-[18px] min-h-[18px]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {user ? (
                            <div className="flex items-center gap-2">
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">{user.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-900 leading-none">{user.name}</p>
                                        <p className="text-[10px] text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-3.5 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-3 border-t border-gray-100 animate-fadeIn">
                        <nav className="flex flex-col gap-1">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/shop', label: 'Shop' },
                                ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
                                ...(user ? [{ href: '/orders', label: 'My Orders' }] : []),
                            ].map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(href)
                                        ? 'text-emerald-600 bg-emerald-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
