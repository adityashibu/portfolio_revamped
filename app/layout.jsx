import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Vercel speed insights
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// Import components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  metadataBase: new URL('https://adityashibu.vercel.app'),
  
  title: {
    template: "%s | Aditya Shibu",
    default: "Aditya Shibu",
  },
  description: "Portfolio of Aditya Shibu, a Computer Science student specializing in AI, Machine Learning, and Robotics.",
  keywords: ["Aditya Shibu", "Aditya S", "Portfolio", "Autonomous Systems Developer", "Robotics", "Heriot-Watt", "Dubai"],
  authors: [{ name: "Aditya Shibu" }],
  
  openGraph: {
    title: "Aditya Shibu - Personal Portfolio",
    description: "Check out my personal portfolio showcasing my projects and skills.",
    url: "https://adityashibu.vercel.app/",
    siteName: "Aditya Shibu",
    images: [
      {
        url: "/assets/photo.png", 
        width: 800,
        height: 600,
        alt: "Aditya Shibu Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aditya Shibu - Personal Portfolio",
    description: "Check out my personal portfolio showcasing my projects and skills.",
    images: ["/assets/photo.png"],
  },
  
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable}`}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}