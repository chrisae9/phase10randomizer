import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phase 10 Randomizer",
  description: "A randomizer for the card game Phase 10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} h-full min-h-screen overscroll-none`}>{children}</body>
    </html>
  );
}
