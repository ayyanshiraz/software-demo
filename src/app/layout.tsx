import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BizVibez CRM",
  description: "Enterprise Management Modules",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50 flex text-slate-900">
        
        {/* FIXED SIDEBAR */}
        <Sidebar />

        {/* 
          MAIN CONTENT 
          ml-72 applies a 288px left margin to prevent text overlap with the sidebar 
        */}
        <main className="flex-1 ml-72 overflow-x-hidden min-h-screen">
          {children}
        </main>
        
      </body>
    </html>
  );
}