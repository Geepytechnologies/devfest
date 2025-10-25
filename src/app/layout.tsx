import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Josefin_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const coolvetica = localFont({
  src: "../assets/fonts/Coolvetica Rg.otf",
  variable: "--font-coolvetica",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const josefinSans = Josefin_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

export const metadata: Metadata = {
  title: "Dev Fest 2025",
  description: "Register and participate in the biggest northern Nigeria tech event"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${josefinSans.variable} ${coolvetica.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
