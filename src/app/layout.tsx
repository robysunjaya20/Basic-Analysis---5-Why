import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://basic-analysis-5why.vercel.app"),

  title: {
    default: "Basic Analysis - 5 Why",
    template: "%s | Basic Analysis - 5 Why",
  },

  description:
    "Basic Analysis 5 Why untuk Pre-Test dan Post-Test Quality Training.",

  keywords: [
    "Basic Analysis",
    "5 Why",
    "5 Why Analysis",
    "Quality Training",
    "Pre-Test",
    "Post-Test",
  ],

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Basic Analysis - 5 Why",
    description:
      "Pre-Test dan Post-Test Basic Analysis 5 Why.",
    url: "https://basic-analysis-5why.vercel.app",
    siteName: "Basic Analysis - 5 Why",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Basic Analysis - 5 Why",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Basic Analysis - 5 Why",
    description:
      "Pre-Test dan Post-Test Basic Analysis 5 Why.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}