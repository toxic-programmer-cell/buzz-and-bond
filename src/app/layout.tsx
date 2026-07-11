import type { Metadata } from "next";
// import { Cormorant, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generalSans } from "@/lib/font";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const cormorant = Cormorant({
//   variable: "--font-cormorant",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   style: ["normal", "italic"],
// });

export const metadata: Metadata = {
  title: "Times Event",
  description: "Ob Firmenfeier, Produktlaunch oder privates Fest – ich helfe euch dabei, Events in unvergessliche Momente zu verwandeln.",
};

import SmoothScroll from "@/components/providers/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${generalSans.variable} antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
