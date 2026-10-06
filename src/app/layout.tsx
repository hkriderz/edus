import type { Metadata, Viewport } from "next";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleTagManager";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * Root layout owns <html>/<body> only. Chrome lives in the route-group layouts
 * so the (demos) group can render without any EDUS navigation at all.
 *
 * Marketing typefaces are also loaded in the marketing group rather than here,
 * which keeps Fraunces/Inter/JetBrains out of demo page loads.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "web design",
    "web development",
    "affordable web design",
    "small business website",
    "local SEO",
    "e-commerce setup",
    "website maintenance",
    "community web design studio",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  // Icons are generated from src/app/icon.svg and src/app/apple-icon.svg by
  // Next's file conventions, so they are not declared here.
  manifest: "/manifest.webmanifest",
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#16130f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ThemeScript />
        <GoogleTagManagerScript />
      </head>
      {/*
        Extensions mutate <body> before hydration (this report was class "vc-init").
        The server sends a bare body. The flag is one level deep, so mismatches
        inside the page still surface.
      */}
      <body suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  );
}
