import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/nextauth";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cedt-JobFair",
  description: "Cedt-JobFair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <div className="h-[105px]">{/*THIS IS JUST FOR PADDING FORM NAVIGATION BAR*/}</div>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
