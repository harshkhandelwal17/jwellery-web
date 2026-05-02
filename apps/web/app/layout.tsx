import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ExperienceEnhancer from "./components/ui/ExperienceEnhancer";

export const metadata: Metadata = {
  title: "Shreeva Jewellers — Feel with Luxury",
  description: "Handcrafted gold jewellery. Shreeva Jewellers — where tradition meets luxury.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
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
