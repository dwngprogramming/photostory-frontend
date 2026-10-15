import {Suspense} from "react";
import {notFound} from "next/navigation";
import FlipTest from "./FlipTest";

// Trang test lật trang với dữ liệu giả, chỉ dùng khi dev
export default function FlipTestPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <Suspense>
      <FlipTest/>
    </Suspense>
  );
}
