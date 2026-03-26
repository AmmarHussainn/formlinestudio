import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "../styles/globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MouseGlow } from "@/components/ui/MouseGlow";
import NextTopLoader from "nextjs-toploader";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Formline AI - Bridging the Gap",
  description: "We Force the Line Between AI and Your Business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} antialiased bg-black text-white font-orbitron relative`}
      >
        <NextTopLoader
          color="#ff0a0a"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #ff0a0a,0 0 5px #ff0a0a"
        />
        <MouseGlow />
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
