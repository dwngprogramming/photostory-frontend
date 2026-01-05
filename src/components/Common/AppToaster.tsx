"use client";

import {useTheme} from "next-themes";
import {Toaster} from "sonner";

function AppToaster() {
  const {theme} = useTheme();
  
  return (
    <Toaster
      position="top-center"
      expand
      richColors
      closeButton
      duration={5000} // Đã chỉnh lại duration hợp lý hơn (20s hơi lâu)
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      toastOptions={{
      //   classNames: {
      //     toast: `
      //   group-[.toaster]:font-sans
      //   group-[.toaster]:rounded-xl
      //   group-[.toaster]:shadow-lg
      //   group-[.toaster]:gap-6
      //   group-[.toaster]:w-fit
      //   group-[.toaster]:min-w-0
      //   group-[.toaster]:mx-auto
      // `,
      //     description: "group-[.toast]:text-muted-foreground",
      //     actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
      //     cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      //   },
        style: {
          fontSize: '14px',
          padding: '12px 20px', // Tăng padding ngang lên một chút cho thoáng khi dùng w-fit
        }
      }}
    />
  );
}

export default AppToaster