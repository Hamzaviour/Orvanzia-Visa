import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingContact from "@/components/FloatingContact";
import Cursor from "@/components/Cursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Orvanzia Visa | Visa Assistance UK | Schengen & Worldwide Visa Consultancy",
    template: "%s | Orvanzia Visa",
  },
  description:
    "Orvanzia Visa provides professional visa assistance for travellers in the UK: Schengen, USA, Canada and 196 destinations worldwide. Eligibility checks, document guidance and application support.",
  keywords: ["visa assistance UK", "Schengen visa UK", "visa consultancy", "tourist visa", "business visa", "Orvanzia Visa"],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0c1f5c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
        <Cursor />
      </body>
    </html>
  );
}
