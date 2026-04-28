import type { Metadata } from "next";
import {
  Josefin_Sans,
  Great_Vibes,
  Bodoni_Moda,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/theme-provider";

const josefinSans = Josefin_Sans({
  weight: "400",
  variable: "--font-josefin",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  weight: "900",
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tu sitio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} ${greatVibes.variable} ${bodoniModa.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
