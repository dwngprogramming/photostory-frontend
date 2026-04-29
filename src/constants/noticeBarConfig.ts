// constants/noticeBarConfig.ts

export type NoticeBarStatus = "accent" | "success" | "warning" | "danger" | "default";
export type NoticeBarPage = "landing" | "application";

export type NoticeBarLink = {
  label: string;
  href: string;
};

export type NoticeBar = {
  id: string;
  enabled: Partial<Record<NoticeBarPage, boolean>>;
  status: NoticeBarStatus;
  message: string;
  links?: NoticeBarLink[];
  closable?: boolean;
};

// Hardcode config. In the future, we can fetch this from backend or CMS for dynamic updates without redeploying.
// Message may be replaced by translated message (query from backend/database)
export const NOTICE_BAR_CONFIG: NoticeBar[] = [
  {
    id: "now-demo-only",
    enabled: {
      landing: true,
      // application không khai báo = mặc định undefined = không hiện
    },
    status: "accent",
    closable: true,
    message: "nowDemoOnly.message",
    links: [
      {label: "nowDemoOnly.linkText", href: "/unwrap"},
    ],
  },
];