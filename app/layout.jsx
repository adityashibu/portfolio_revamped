import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Vercel speed insights
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// Import components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { RetroModeProvider } from "@/components/RetroModeContext";
import TerminalWindow from "@/components/TerminalWindow";

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
  description: "Portfolio of Aditya Shibu, a Computer Science student specializing in Autonomous Systems, AI, and Robotics. Researching LiDAR compression and drone control.",
  keywords: ["Aditya Shibu", "Autonomous Systems", "AI Researcher", "Robotics Engineer", "Heriot-Watt", "LiZIP", "SkySim"],
  authors: [{ name: "Aditya Shibu" }],
  
  openGraph: {
    title: "[ADITYA_SHIBU] // Portfolio v1.0.0",
    description: ">_ System initialized. Autonomous Systems Developer // AI Researcher. Accessing portfolio data...",
    url: "https://adityashibu.vercel.app/",
    siteName: "Aditya Shibu Terminal",
    images: [
      {
        url: "/assets/photo.png", 
        width: 1200,
        height: 630,
        alt: "Aditya Shibu Portfolio Terminal Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "[ADITYA_SHIBU] // Terminal Interface",
    description: ">_ Autonomous Systems | AI Research | Robotics. View system logs and technical assets.",
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
        <RetroModeProvider>
          <TerminalWindow>
            <Header />
            <PageTransition>{children}</PageTransition>
          </TerminalWindow>
        </RetroModeProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}