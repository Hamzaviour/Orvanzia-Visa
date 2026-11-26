import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingContact from "@/components/FloatingContact";
import Cursor from "@/components/Cursor";
import SocialRail from "@/components/SocialRail";
import { JsonLd, organizationLd, websiteLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", weight: ["600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Orvanzia Visa | Visa Assistance UK | Schengen & Worldwide Visa Consultancy",
    template: "%s | Orvanzia Visa",
  },
  description:
    "Orvanzia Visa provides professional visa assistance for travellers in the UK: Schengen, USA, Canada and 196 destinations worldwide. Eligibility checks, document guidance and application support.",
  applicationName: site.name,
  keywords: [
    "visa assistance UK",
    "visa agent UK",
    "Schengen visa UK",
    "Schengen visa appointment",
    "USA visa from UK",
    "Canada visa from UK",
    "visa consultancy London",
    "tourist visa",
    "business visa",
    "student visa",
    "work visa",
    "transit visa",
    "Orvanzia Visa",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "/",
    title: "Orvanzia Visa | Visa Assistance for UK Travellers",
    description: "Expert visa assistance from the UK for 196 destinations: Schengen, USA, Canada, UAE and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvanzia Visa | Visa Assistance for UK Travellers",
    description: "Expert visa assistance from the UK for 196 destinations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: true, email: true, address: false },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/icons/icon-152.png", sizes: "152x152" },
      { url: "/icons/icon-167.png", sizes: "167x167" },
    ],
    shortcut: "/favicon.ico",
  },
  appleWebApp: { capable: true, title: "Orvanzia Visa", statusBarStyle: "default" },
  other: {
    "msapplication-TileColor": "#0c1f5c",
    "msapplication-TileImage": "/icons/mstile-150.png",
    "msapplication-config": "/browserconfig.xml",
  },
  // Add the Search Console / Bing codes here once the domain is verified.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1f5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://flagcdn.com" />
        <link rel="preconnect" href="https://thumb.wikimedia.org" />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <SocialRail />
        <FloatingContact />
        <Cursor />
      </body>
    </html>
  );
}
