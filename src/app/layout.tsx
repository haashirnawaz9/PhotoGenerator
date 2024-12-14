import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "PhotoGenAI - Haashir Nawaz",
  description: "PhotoGenAI - Generate a photo using AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
