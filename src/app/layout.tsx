import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TextProvider } from "@Contexts/Text";
import { CanvaProvider } from "@Contexts/Canva";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Generador de memes",
  description: "Create by Redd and Sparrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TextProvider>
          <CanvaProvider>{children}</CanvaProvider>
        </TextProvider>
      </body>
    </html>
  );
}
