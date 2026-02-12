import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.midlineairlines.com"),
  title: "Midline Airlines | Private Jet Charter, Aircraft Management & MRO Services",
  description:
    "Midline Airlines offers private jet charter, aircraft management and sales, cargo transportation, and certified MRO services for luxury aviation worldwide.",
  applicationName: "Midline Airlines",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Midline Airlines",
    "private jet charter",
    "aircraft management",
    "aircraft sales",
    "cargo transportation",
    "MRO services",
    "luxury aviation",
  ],
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    title:
      "Midline Airlines | Private Jet Charter, Aircraft Management & MRO Services",
    description:
      "Midline Airlines offers private jet charter, aircraft management and sales, cargo transportation, and certified MRO services for luxury aviation worldwide.",
    siteName: "Midline Airlines",
    images: [
      {
        url: "/sequence-1/001.jpg",
        width: 1200,
        height: 630,
        alt: "Midline Airlines private jet charter aircraft on runway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Midline Airlines | Private Jet Charter, Aircraft Management & MRO Services",
    description:
      "Midline Airlines offers private jet charter, aircraft management and sales, cargo transportation, and certified MRO services for luxury aviation worldwide.",
    images: ["/sequence-1/001.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e152e",
};

import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrolling>
          <Navbar />
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
