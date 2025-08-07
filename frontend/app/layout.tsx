import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TasteTrail",
  description:
    "TasteTrail is a platform for food lovers to discover new restaurants and dishes.",
  keywords: ["food", "restaurant", "dish", "taste", "trail"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
