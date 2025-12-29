import type {Metadata} from "next";
import {Inter, Merriweather, Playfair_Display} from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/contexts/theme-provider";
import {Toaster} from "react-hot-toast";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import "driver.js/dist/driver.css";

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

const merriweather = Merriweather({
  subsets: ['vietnamese'], // BẮT BUỘC để hiển thị tiếng Việt đẹp
  weight: ['300', '400', '700', '900'], // Lấy đủ các độ đậm
  style: ['normal', 'italic'],
  variable: '--font-merriweather', // Tên biến để dùng bên CSS
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${merriweather.variable} antialiased`} suppressHydrationWarning>
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