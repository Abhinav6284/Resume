import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SmoothScrolling from "@/components/SmoothScrolling";
import GlassNavbar from "@/components/GlassNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Microbiology Portfolio",
  description: "Exploring the Invisible World of Microbiology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text antialiased`}>
        <SmoothScrolling>
          <GlassNavbar />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
