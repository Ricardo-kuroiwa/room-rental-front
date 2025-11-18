import type { Metadata } from "next";
import { Geist, Geist_Mono ,Inter,Poppins} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const PoppinsFont = Poppins({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ['latin'],
  variable: "--font-poppins",
});
const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Space Rental - Encontre Seu Espaço Perfeito",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/key-round.svg" />
        <link rel="apple-touch-icon" href="/key-round.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${InterFont.variable} ${PoppinsFont.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
