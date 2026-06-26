import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CapacityOS — Eliminate Empty Miles",
  description:
    "CapacityOS is a specialized capacity marketplace that eliminates profit leaks in logistics by monetizing underutilized truck space.",
  keywords: ["logistics", "capacity marketplace", "trucking", "freight", "partial loads"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}