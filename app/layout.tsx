import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "./providers/LenisProvider";

export const metadata: Metadata = {
  title: "Student Survival Simulator — Can You Survive as a Student in India?",
  description:
    "A 3-minute interactive simulation. Exam delays, server crashes, paper leaks. Can you survive the Indian student experience?",
  openGraph: {
    title: "Student Survival Simulator",
    description: "A 3-minute interactive simulation. Can you survive?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#020304] overflow-x-hidden">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
