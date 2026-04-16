'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { categories } from '@/data/medicines';
import { Medicine } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminPage() {
    const { user, isAdmin } = useAuth();
    const { medicines, addMedicine, updateMedicine, deleteMedicine } = useStore();
    const [showAddForm, setShowAddForm] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Pain Relief',
        stock: '',
        image: '',
        manufacturer: '',
        requiresPrescription: false,
    });

    if (!user || !isAdmin) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-16 animate-fadeIn">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-16 h-16 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
                    <p className="text-gray-500 mb-8">You need admin privileges to access this page.</p>
                    <Link href="/login" className="inline-flex px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl">
                        Login as Admin
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAdding(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const medicineData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            stock: parseInt(formData.stock),
            image: formData.image || 'https://picsum.photos/seed/medicine/400/300',
            manufacturer: formData.manufacturer,
            requiresPrescription: formData.requiresPrescription,
        };

        if (editingId) {
            updateMedicine(editingId, medicineData);
        } else {
            addMedicine(medicineData);
        }

        setFormData({
            name: '',
            description: '',
            price: '',
            category: 'Pain Relief',
            stock: '',
            image: '',
            manufacturer: '',
            requiresPrescription: false,
        });
        setShowAddForm(false);
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (medicine: Medicine) => {
        setFormData({
            name: medicine.name,
            description: medicine.description,
            price: medicine.price.toString(),
            category: medicine.category,
            stock: medicine.stock.toString(),
            image: medicine.image,
            manufacturer: medicine.manufacturer,
            requiresPrescription: medicine.requiresPrescription,
        });
        setEditingId(medicine.id);
        setShowAddForm(true);
    };

    const totalStock = medicines.reduce((sum, m) => sum + m.stock, 0);
    const lowStockCount = medicines.filter((m) => m.stock < 20).length;
    const categoriesCount = new Set(medicines.map((m) => m.category)).size;

    return (
        <div className="min-h-screen bg-gray-50 py-8 animate-fadeIn">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
                        <p className="text-gray-500 text-sm">Manage medicines and inventory</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setFormData({
                                name: '',
                                description: '',
                                price: '',
                                category: 'Pain Relief',
                                stock: '',
                                image: '',
                                manufacturer: '',
                                requiresPrescription: false,
                            });
                            setShowAddForm(!showAddForm);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Medicine
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <p className="text-sm text-gray-500 mb-1">Total Products</p>
                        <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <p className="text-sm text-gray-500 mb-1">Total Stock</p>
                        <p className="text-2xl font-bold text-gray-900">{totalStock.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <p className="text-sm text-gray-500 mb-1">Categories</p>
                        <p className="text-2xl font-bold text-gray-900">{categoriesCount}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <p className="text-sm text-gray-500 mb-1">Low Stock Items</p>
                        <p className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-rose-600' : 'text-gray-900'}`}>{lowStockCount}</p>
                    </div>
                </div>

                {/* Add Medicine Form */}
                {showAddForm && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 animate-slideUp">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">{editingId ? 'Edit Medicine' : 'Add New Medicine'}</h2>
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                    placeholder="e.g., Paracetamol 500mg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                                <input
                                    type="text"
                                    value={formData.manufacturer}
                                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                    placeholder="e.g., HealthCare Plus"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                    placeholder="/assets/medicines/medicine-name.jpg (Place file in public/assets/medicines)"
                                />
                                <p className="text-xs text-gray-500 mt-1">To use local images, place them in the &quot;public/assets/medicines&quot; folder and reference them here.</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 resize-none"
                                    placeholder="Enter medicine description..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price (&#8377;)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                    placeholder="100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white"
                                >
                                    {categories.slice(1).map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.requiresPrescription}
                                        onChange={(e) => setFormData({ ...formData, requiresPrescription: e.target.checked })}
                                        className="w-5 h-5 rounded"
                                    />
                                    <span className="text-gray-700">Requires Prescription</span>
                                </label>
                            </div>
                            <div className="md:col-span-2 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={isAdding}
                                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isAdding ? <LoadingSpinner size="sm" color="white" /> : null}
                                    {isAdding ? 'Saving...' : (editingId ? 'Update Medicine' : 'Add Medicine')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Medicines List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">All Medicines ({medicines.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Medicine</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Category</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Price</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Stock</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {medicines.map((med) => (
                                    <tr key={med.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-800">{med.name}</p>
                                                <p className="text-sm text-gray-500">{med.manufacturer}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">{med.category}</span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">&#8377;{med.price.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={med.stock < 20 ? 'text-rose-600 font-medium' : 'text-gray-800'}>{med.stock}</span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(med)}
                                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                                title="Edit"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => deleteMedicine(med.id)}
                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
