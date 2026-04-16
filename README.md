# PharmaCare — Online Pharmacy Store

> BCA 5th Semester Project | Next.js 16, React 19, TypeScript, Tailwind CSS v4
> **Project Status: Completed ✅**


---

## About

**PharmaCare** is an online pharmacy web application that simulates a real-world medicine e-commerce platform. Customers can browse, search, and order medicines, while admins manage inventory through a dedicated dashboard.

---

## Features

### Customer
- **Product Catalog** — Browse medicines with search, category filters, and sorting
- **Medicine Cards** — Color-coded gradient cards per category (Pain Relief, Vitamins, etc.)
- **Product Detail Pages** — Full details with quantity selector and add-to-cart
- **Shopping Cart** — Add, update quantity, remove items with live total
- **Checkout Flow** — Shipping address, payment method selection, order placement
- **Order History** — View past orders with status tracking and printable bills

### Admin
- **Dashboard Stats** — Total products, stock count, categories, low-stock alerts
- **CRUD Operations** — Add, edit, and delete medicines
- **Inventory Table** — View all medicines with stock levels and quick actions

### Auth
- **Login / Register** — Client-side auth with role-based access (user/admin)
- **Demo Credentials** — Pre-configured accounts for testing

---

## Medicine Categories

| Category | Color Theme |
|---|---|
| Pain Relief | Orange |
| Antibiotics | Rose |
| Vitamins | Amber |
| Cold & Flu | Sky Blue |
| Digestive Health | Emerald |
| Skin Care | Fuchsia |
| First Aid | Red |
| Wellness | Violet |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework (App Router) |
| **React 19** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS v4** | Utility-first styling |
| **React Context API** | State management (Auth, Cart, Store) |

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone git@github.com:rudransh-ai-dev/BCA-5th-sem-project-.git
cd BCA-5th-sem-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@pharmacy.com | admin123 |
| User | rudransh@example.com | user123 |

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin dashboard (CRUD, stats)
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout flow
│   ├── login/            # Login page
│   ├── orders/           # Order history & detail
│   │   └── [id]/         # Individual order + bill
│   ├── register/         # Registration page
│   ├── shop/             # Medicine catalog
│   │   └── [id]/         # Product detail page
│   ├── globals.css       # Global styles & animations
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Homepage
├── components/
│   ├── CartItemCard.tsx   # Cart line item
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Navigation with active states
│   ├── LoadingSpinner.tsx # Reusable spinner
│   ├── MedicineCard.tsx   # Product card for listings
│   └── MedicineImage.tsx  # Gradient placeholder with category icon
├── context/
│   ├── AuthContext.tsx    # Authentication state
│   ├── CartContext.tsx    # Shopping cart state
│   └── StoreContext.tsx   # Medicines, orders, billing
├── data/
│   └── medicines.ts      # Sample medicine data & categories
└── types/
    └── index.ts          # TypeScript interfaces
```

---

## UI Design

- **Inter font** for clean, modern typography
- **Category-specific gradient images** instead of placeholder stock photos
- **Consistent color system** — each medicine category has a unique color
- **Currency**: Indian Rupee (₹) throughout
- **Responsive** — works on mobile, tablet, and desktop
- **Animations** — fade-in, slide-up, float effects with CSS keyframes
- **Active navigation** — current page highlighted in header

---

## Future Enhancements

- [ ] **Database** — Migrate from localStorage/Context to MongoDB or PostgreSQL via Prisma
- [ ] **Auth** — Implement NextAuth.js or JWT-based authentication
- [ ] **SSR** — Move product fetching to Server Components for SEO
- [ ] **Payments** — Integrate Razorpay or Stripe for real checkout
- [ ] **Image uploads** — Allow admins to upload actual product images
- [ ] **Order management** — Admin order status updates and notifications
- [ ] **AI-Powered Search** — Intelligent medicine recommendations and semantic search
- [ ] **Voice Commerce** — Search for medicines using voice commands
- [ ] **PWA Support** — Enable offline browsing and push notifications for order updates
- [ ] **Doctor Consultation** — Integrated live chat/video call with pharmacists or doctors


---

## Developer

**BCA 5th Semester Project**
GitHub: [@rudransh-ai-dev](https://github.com/rudransh-ai-dev)

---

## License

This project is for academic purposes only.
