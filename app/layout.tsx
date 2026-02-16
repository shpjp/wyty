import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wyt? - what's your type | Master Your Coding Speed",
  description: "Type code at the speed of thought. Practice algorithm solutions, build muscle memory, and improve your coding speed. Challenge yourself daily!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-950`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
