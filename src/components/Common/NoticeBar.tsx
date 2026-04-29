"use client";

import {X} from "lucide-react";
import {useState} from "react";
import {NOTICE_BAR_CONFIG, NoticeBarPage, NoticeBarStatus} from "@/constants/noticeBarConfig";
import {useTranslations} from "next-intl";
import {Link} from "@/libs/i18n/navigation";

const statusStyles: Record<NoticeBarStatus, string> = {
  accent: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800",
  success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800",
  danger: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800",
  default: "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700",
};

export default function NoticeBar({page}: { page: NoticeBarPage }) {
  const t = useTranslations('Common.noticeBar');
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [dismissing, setDismissing] = useState<string[]>([]);
  
  const handleDismiss = (id: string) => {
    // Đánh dấu đang trong quá trình dismiss (trigger animation)
    setDismissing((prev) => [...prev, id]);
    
    // Sau khi animation xong mới remove khỏi danh sách
    setTimeout(() => {
      setDismissed((prev) => [...prev, id]);
      setDismissing((prev) => prev.filter((d) => d !== id));
    }, 300);
  };
  
  const activeNoticeBars = NOTICE_BAR_CONFIG.filter(
    (b) => (b.enabled[page] ?? false) && !dismissed.includes(b.id)
  );
  
  if (activeNoticeBars.length === 0) return null;
  
  return (
    <div className="flex flex-col">
      {activeNoticeBars.map((noticeBar) => {
        const isDismissing = dismissing.includes(noticeBar.id);
        
        return (
          <div
            key={noticeBar.id}
            className={`
              flex items-center justify-between px-4 py-2 border-b text-sm
              overflow-hidden transition-all duration-300 ease-in-out
              ${isDismissing ? "max-h-0 opacity-0 py-0" : "max-h-20 opacity-100"}
              ${statusStyles[noticeBar.status]}
            `}
          >
            <span className="flex-1 text-center">
              {t(noticeBar.message)}{" "}
              {noticeBar.links?.map((link) => (
                <Link key={link.href} href={link.href} className="underline font-medium">
                  {t(link.label)}
                </Link>
              ))}
            </span>
            {noticeBar.closable && (
              <button
                onClick={() => handleDismiss(noticeBar.id)}
                className="ml-4 p-1 rounded hover:opacity-70 transition-opacity"
              >
                <X size={14}/>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}