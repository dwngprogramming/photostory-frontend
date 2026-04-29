import createMiddleware from "next-intl/middleware";
import { routing } from "@/libs/i18n/routing";

const handleProxy = createMiddleware(routing);

// Export default function (Chuẩn Next.js Proxy)
export default function proxy(req: any) {
  console.log('Current URL Locale:', req.nextUrl.locale);
  return handleProxy(req);
}

// Config matcher giữ nguyên
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};