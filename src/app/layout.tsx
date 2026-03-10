import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PharmaCare - Your Trusted Online Pharmacy",
  description: "Shop quality medicines and healthcare products online. Fast delivery, secure payments, and expert care.",
  keywords: "pharmacy, medicine, healthcare, online pharmacy, drugs, vitamins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <StoreProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </StoreProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
