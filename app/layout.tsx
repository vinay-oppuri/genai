import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next';
import "./globals.css";

import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from 'sonner';
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meet AI",
  description: "Get your agents to attend meetings",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
