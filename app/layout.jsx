import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Vercel speed insights
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// Import components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import Head from "next/head";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Aditya S",
  description: "My personal portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Aditya S - Personal Portfolio" />
        <meta
          property="og:description"
          content="Check out my personal portfolio showcasing my projects and skills."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adityashibu.vercel.app/" />
        <meta property="og:image" content="/assets/photo.png" />
        <meta
          property="og:image:alt"
          content="Preview of my personal portfolio website"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aditya S - Personal Portfolio" />
        <meta
          name="twitter:description"
          content="Check out my personal portfolio showcasing my projects and skills."
        />
        <meta name="twitter:image" content="/assets/photo.png" />
        <meta
          name="twitter:image:alt"
          content="Preview of my personal portfolio website"
          w
        />

        {/* Additional meta for SEO */}
        <meta name="author" content="Aditya S" />
        <meta
          name="keywords"
          content="portfolio, Aditya S, web developer, projects, personal website"
        />
      </Head>
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
