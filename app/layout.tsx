import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "./providers/LenisProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Student Survival Simulator — Can You Survive as a Student in India?",
  description:
    "A 3-minute interactive simulation. Exam delays, server crashes, paper leaks. Can you survive the Indian student experience?",
  openGraph: {
    title: "Student Survival Simulator",
    description:
      "A 3-minute interactive simulation. Exam delays, server crashes, paper leaks. Can you survive the Indian student experience?",
    type: "website",
    siteName: "Student Survival Simulator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Student Survival Simulator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Survival Simulator",
    description:
      "A 3-minute interactive simulation. Can you survive as a student in India?",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#020304] overflow-x-hidden">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
