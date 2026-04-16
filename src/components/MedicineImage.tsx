'use client';

import { ReactNode } from 'react';

interface MedicineImageProps {
    category: string;
    name: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const categoryStyles: Record<string, { gradient: string; icon: ReactNode }> = {
    'Pain Relief': {
        gradient: 'from-orange-400 to-amber-500',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    'Antibiotics': {
        gradient: 'from-rose-400 to-pink-500',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    'Vitamins': {
        gradient: 'from-amber-400 to-yellow-500',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    'Cold & Flu': {
        gradient: 'from-sky-400 to-blue-500',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
    },
    'Digestive Health': {
        gradient: 'from-emerald-400 to-green-500',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
    'Skin Care': {
        gradient: 'from-fuchsia-400 to-pink-500',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
    },
    'First Aid': {
        gradient: 'from-red-400 to-rose-500',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    'Wellness': {
        gradient: 'from-violet-400 to-purple-500',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
    },
};

const defaultStyle = {
    gradient: 'from-teal-400 to-emerald-500',
    icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
    ),
};

const sizeMap = {
    sm: { container: 'w-12 h-12', icon: 'w-6 h-6' },
    md: { container: 'h-48', icon: 'w-16 h-16' },
    lg: { container: 'h-full min-h-[320px]', icon: 'w-24 h-24' },
};

export default function MedicineImage({ category, name, size = 'md', className = '' }: MedicineImageProps) {
    const style = categoryStyles[category] || defaultStyle;
    const sizes = sizeMap[size];

    return (
        <div className={`relative bg-gradient-to-br ${style.gradient} ${sizes.container} flex items-center justify-center overflow-hidden ${className}`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 left-2 w-8 h-8 border-2 border-white rounded-full" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white rounded-full" />
                <div className="absolute top-1/3 right-1/4 w-6 h-6 border-2 border-white rounded-full" />
                <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-white rounded-full" />
            </div>

            {/* Icon */}
            <div className={`${sizes.icon} text-white/90 relative z-10 drop-shadow-sm`}>
                {style.icon}
            </div>

            {/* Medicine initial */}
            {size !== 'sm' && (
                <div className="absolute bottom-3 left-4 text-white/30 text-6xl font-black leading-none select-none">
                    {name.charAt(0)}
                </div>
            )}
        </div>
    );
}
