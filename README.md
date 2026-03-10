# 💊 PharmaCare — Online Pharmacy Store

> A BCA 5th Semester Project | Built with Next.js, React, TypeScript & Tailwind CSS

---

## 📌 About the Project

**PharmaCare** is a modern full-stack online pharmacy store web application that simulates a real-world medicine e-commerce platform. It provides a seamless shopping experience for customers and a powerful dashboard for administrators to manage inventory and orders.

---

## ✨ Features

- 🛒 **Product Catalog** — Browse medicines by category with search & filter
- 💊 **Medicine Listings** — Name, price, stock, manufacturer, prescription flag
- 🛍️ **Shopping Cart** — Add, update, and remove items in real-time
- 📦 **Checkout Flow** — Complete multi-step order placement
- 📋 **Order History** — View and track previously placed orders
- 🔐 **User Authentication** — Register and login functionality
- 🛠️ **Admin Dashboard** — Manage products, stock levels, and orders

---

## 🗂️ Medicine Categories

- Pain Relief
- Antibiotics
- Vitamins & Supplements
- Cold & Flu
- Digestive Health
- Skin Care
- First Aid
- Wellness

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework (App Router) |
| **React 19** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS v4** | Utility-first styling |
| **React Context API** | Global state management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone git@github.com:LillyShadow/BCA-5th-sem-project-.git

# Navigate into the project
cd pharmacy-store

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📁 Project Structure

```
src/
├── app/            # Next.js App Router pages
│   ├── admin/      # Admin dashboard
│   ├── cart/       # Shopping cart page
│   ├── checkout/   # Checkout flow
│   ├── login/      # Login page
│   ├── orders/     # Order history
│   ├── register/   # Registration page
│   └── shop/       # Medicine shop listing
├── components/     # Reusable UI components
├── context/        # React Context for global state
├── data/           # Static medicine data
└── types/          # TypeScript type definitions
```

---

## � Future Enhancements (Real-World Integration)

While this project currently uses simulated data for academic demonstration, the following real-world integrations are planned:
- [ ] **Real Database Integration:** Migrate `localstorage`/Context dummy data to a production database (e.g., MongoDB, PostgreSQL via Prisma).
- [ ] **Secure Authentication:** Implement NextAuth.js or JWT-based authentication instead of simulated client-side login.
- [ ] **Image Optimization:** Replace native `<img>` tags with Next.js `<Image>` component for better performance metrics.
- [ ] **Server-Side Rendering (SSR):** Move product fetching and catalog generation to Server Components for improved SEO and initial load times.
- [ ] **Payment Gateway Integration:** Add real payment processing (e.g., Stripe, Razorpay) to replace the simulated checkout flow.

---

## �👩‍💻 Developer

**BCA 5th Semester Project**  
GitHub: [@LillyShadow](https://github.com/LillyShadow)

---

## 📄 License

This project is for academic purposes only.
