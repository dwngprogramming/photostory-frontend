import type {Metadata} from "next";
import {Inter, Playfair_Display} from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";

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

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Thêm class "dark" vào đây nếu bạn muốn test giao diện tối thủ công
    // hoặc dùng next-themes để quản lý
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}