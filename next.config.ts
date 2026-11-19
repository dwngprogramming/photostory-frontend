import type { NextConfig } from "next";

// Khai báo alias `next-intl/config` thủ công thay cho `createNextIntlPlugin`.
// Plugin của next-intl luôn nạp `@swc/core` (chỉ dùng cho tính năng
// experimental.extract mà dự án không dùng). Native binding của `@swc/core`
// không tải được trên môi trường build của Cloudflare, khiến `next build`
// lỗi ngay khi nạp file config này.
const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/libs/i18n/i18n.ts",
    },
  },
};

export default nextConfig;
