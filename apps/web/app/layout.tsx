import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ExperienceEnhancer from "./components/ui/ExperienceEnhancer";
import { getSiteUrl } from "./lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shreeva Jewellers | Gold, Silver & Diamond Jewellery",
    template: "%s | Shreeva Jewellers",
  },
  description:
    "Shop handcrafted gold, silver and lab-grown diamond jewellery at Shreeva Jewellers. Discover rings, necklaces, earrings and bridal collections.",
  keywords: [
    "Shreeva Jewellers",
    "gold jewellery",
    "silver jewellery",
    "diamond jewellery",
    "bridal jewellery",
    "jewellery store",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Shreeva Jewellers | Gold, Silver & Diamond Jewellery",
    description:
      "Discover handcrafted jewellery collections including gold, silver and lab-grown diamond pieces.",
    siteName: "Shreeva Jewellers",
    images: [
      {
        url: "/about-main.jpg",
        width: 1200,
        height: 630,
        alt: "Shreeva Jewellers collection showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreeva Jewellers | Gold, Silver & Diamond Jewellery",
    description:
      "Explore elegant handcrafted jewellery for everyday and bridal occasions.",
    images: ["/about-main.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  category: "shopping",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Corinthia:wght@400;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body min-h-full flex flex-col antialiased">
        <ExperienceEnhancer />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
