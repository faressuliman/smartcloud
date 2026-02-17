import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google"; // Import Arabic font
import "./globals.css";
import LoadingScreen from "./components/ui/LoadingScreen";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",  
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
    variable: "--font-cairo",
    subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Smart Cloud",
  description: "Smart Cloud is a company that provides smart cloud solutions to businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased overflow-x-hidden font-cairo`} // apply cairo
      >
        <LanguageProvider>
           <LoadingScreen />
           <WhatsAppButton />
           {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
