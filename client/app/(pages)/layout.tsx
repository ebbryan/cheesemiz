import type { Metadata } from "next";
import { Geist, Geist_Mono, B612, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/(shared)/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const b612 = B612({
  variable: "--font-b612",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Cheesemiz",
  description: "Open Source ChatApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${b612.variable} ${inter.variable} antialiased`}
      >
        <Navigation>{children}</Navigation>
      </body>
    </html>
  );
}
