import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ForgeSuit — AI CRM Platform",
  description: "AI-powered WhatsApp CRM & Automation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased text-saas-text bg-saas-bg selection:bg-saas-primary/20 selection:text-saas-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
