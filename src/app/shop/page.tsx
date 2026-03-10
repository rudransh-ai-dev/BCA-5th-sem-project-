'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import MedicineCard from '@/components/MedicineCard';
import { categories } from '@/data/medicines';
import LoadingSpinner from '@/components/LoadingSpinner';

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';

    const { medicines } = useStore();
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');

    const filteredMedicines = useMemo(() => {
        let filtered = medicines;

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter((med) => med.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (med) =>
                    med.name.toLowerCase().includes(query) ||
                    med.description.toLowerCase().includes(query) ||
                    med.manufacturer.toLowerCase().includes(query)
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered = [...filtered].sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered = [...filtered].sort((a, b) => b.price - a.price);
                break;
            case 'name':
            default:
                filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return filtered;
    }, [medicines, selectedCategory, searchQuery, sortBy]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-8 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop Medicines</h1>
                    <p className="text-gray-500">
                        Browse our wide selection of quality medicines and healthcare products
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search medicines..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high')}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200'
                                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-500">
                        Showing <span className="font-medium text-gray-800">{filteredMedicines.length}</span> products
                        {selectedCategory !== 'All' && (
                            <span> in <span className="font-medium text-emerald-600">{selectedCategory}</span></span>
                        )}
                    </p>
                </div>

                {/* Products Grid */}
                {filteredMedicines.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMedicines.map((medicine, index) => (
                            <div
                                key={medicine.id}
                                className="animate-slideUp"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <MedicineCard medicine={medicine} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your search or filter to find what you&apos;re looking for.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSearchQuery('');
                            }}
                            className="px-6 py-3 bg-emerald-50 text-emerald-600 font-medium rounded-xl hover:bg-emerald-100 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
