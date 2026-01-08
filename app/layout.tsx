import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
// PENTING: Ini yang bikin error kalau lupa di-import
import { CartProvider } from "./context/cart-context"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keripik Tempe Niti",
  description: "Kelezatan Tradisional yang Legendaris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Script Midtrans (Sandbox Public Key) */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-nKsqvar5cn60u2Lv"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* PENTING: Semua halaman harus dibungkus CartProvider ini */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}