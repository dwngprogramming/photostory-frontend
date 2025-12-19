import React from "react";
import PhotostoryShell from "@/components/Application/User/Layout/PhotostoryShell";

export default function PhotostoryLayout({children}: { children: React.ReactNode }) {
  return <PhotostoryShell>{children}</PhotostoryShell>;
}