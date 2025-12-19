import type {Metadata} from "next";
import {Inter, Playfair_Display} from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";
import {Toaster} from "react-hot-toast";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

// Khai báo Font
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter', // Biến này sẽ được @theme --font-sans gọi
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair', // Biến này sẽ được @theme --font-serif gọi
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Photostory - Preserve Your Memories",
  description: "Create & Preserve your photo-story moments.",
};

export default async function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  
  const messages = await getMessages();
  
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Toaster
              position="top-center"
              toastOptions={{
                className: 'dark:bg-stone-800 dark:text-white',
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
              }}
            />
              {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}