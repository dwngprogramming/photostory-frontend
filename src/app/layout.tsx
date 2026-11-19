import type {Metadata} from "next";
import {Inter, Merriweather, Playfair_Display} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/contexts/theme-provider";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages, getTranslations} from "next-intl/server";
import "driver.js/dist/driver.css";
import AppToaster from "@/components/Common/AppToaster";
import ReactQueryProvider from "@/contexts/react-query-provider";
import GlobalAudioPlayer from "@/components/Application/Showtime/Album/Plugin/GlobalPlayerControl";
import StoreProvider from "@/contexts/redux-provider";

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

// Caveat bản Việt hoá, đủ 9 độ đậm (100 → 900); giấy phép OFL nằm cùng thư mục font
const caveat = localFont({
  src: [
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-Thin.woff2', weight: '100', style: 'normal'},
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-ExtraLight.woff2', weight: '200', style: 'normal'},
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-Light.woff2', weight: '300', style: 'normal'},
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-Regular.woff2', weight: '400', style: 'normal'},
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-SemiBold.woff2', weight: '600', style: 'normal'},
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-Bold.woff2', weight: '700', style: 'normal'},
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-ExtraBold.woff2', weight: '800', style: 'normal'},
    {path: '../fonts/caveat-vietnamese/CaveatVietnamese-Black.woff2', weight: '900', style: 'normal'},
  ],
  variable: '--font-caveat', // Biến này sẽ được @theme --font-hand gọi
  display: 'swap',
  preload: false, // Font phụ cho chữ viết tay: không nạp trước cả 9 file ở mọi trang
});

// Metadata theo ngôn ngữ (lấy từ mục "Metadata" trong file locale)
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({locale, namespace: "Metadata"});

  return {
    // Gốc URL để Next.js tạo link tuyệt đối cho og:image / twitter:image.
    // Đặt NEXT_PUBLIC_SITE_URL ở môi trường build (Cloudflare), ví dụ https://photostory.linepie.com
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: t("title"),
    description: t("description"),
    // Photostory là một sản phẩm của Linepie
    applicationName: "Photostory",
    creator: "Linepie",
    publisher: "Linepie",
  };
}

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  
  const messages = await getMessages();
  const locale = await getLocale();
  
  return (
    <html lang={`${locale}`} className={`${inter.variable} ${playfair.variable} ${merriweather.variable} ${caveat.variable} antialiased`}
          suppressHydrationWarning>
    <body>
    <NextIntlClientProvider messages={messages}>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <StoreProvider>
            <AppToaster/>
            {/*<Toaster*/}
            {/*  position="top-center"*/}
            {/*  toastOptions={{*/}
            {/*    className: 'dark:bg-stone-800 dark:text-white',*/}
            {/*    style: {*/}
            {/*      background: 'var(--toast-bg)',*/}
            {/*      color: 'var(--toast-color)',*/}
            {/*    },*/}
            {/*  }}*/}
            {/*/>*/}
            {children}
            <GlobalAudioPlayer/>
          </StoreProvider>
        </ThemeProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}