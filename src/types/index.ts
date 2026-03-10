// Medicine Type
export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  manufacturer: string;
  requiresPrescription: boolean;
}

// User Type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
}

// Cart Item Type
export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

// Order Type
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: string;
  paymentMethod: string;
}

// Billing Type
export interface Bill {
  orderId: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
  generatedAt: Date;
}

// Category Type
export type MedicineCategory = 
  | 'Pain Relief'
  | 'Antibiotics'
  | 'Vitamins'
  | 'Cold & Flu'
  | 'Digestive Health'
  | 'Skin Care'
  | 'First Aid'
  | 'Wellness';
