'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import MedicineCard from '@/components/MedicineCard';
import { categories } from '@/data/medicines';

export default function HomePage() {
  const { medicines } = useStore();
  const featuredMedicines = medicines.slice(0, 4);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                Trusted by 50,000+ customers
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Health,
                <br />
                <span className="text-emerald-100">Our Priority</span>
              </h1>
              <p className="text-lg lg:text-xl text-emerald-100 mb-8 max-w-lg">
                Quality medicines and healthcare products delivered to your doorstep.
                Experience the convenience of online pharmacy shopping.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Shop Now
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-4 bg-emerald-600/30 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  Create Account
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-float">
                  <div className="w-64 h-64 bg-white/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-32 h-32 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f0fdf4" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                ),
                title: 'Fast Delivery',
                description: 'Get your medicines delivered within 24-48 hours',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Genuine Products',
                description: '100% authentic medicines from verified suppliers',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Best Prices',
                description: 'Competitive prices with great discounts',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: '24/7 Support',
                description: 'Round the clock customer support',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Browse our wide range of healthcare products organized by category
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1).map((category, index) => (
              <Link
                key={category}
                href={`/shop?category=${encodeURIComponent(category)}`}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-emerald-500 group-hover:to-teal-600 transition-all">
                  <svg
                    className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors"
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
                <h3 className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-500">
                Top-selling medicines and healthcare essentials
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 px-6 py-3 text-emerald-600 font-medium hover:bg-emerald-50 rounded-xl transition-colors"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 font-medium rounded-xl hover:bg-emerald-100 transition-colors"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust PharmaCare for their healthcare needs.
            Sign up today and get 10% off your first order!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Get Started Free
            </Link>
            <Link
              href="/shop"
              className="px-8 py-4 bg-emerald-700/50 text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-emerald-700/70 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
