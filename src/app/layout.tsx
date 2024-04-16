import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TextProvider } from "@/context/text.context";
import { EditProvider } from "@/context/edit.context";

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
          <EditProvider>{children}</EditProvider>
        </TextProvider>
      </body>
    </html>
  );
}
