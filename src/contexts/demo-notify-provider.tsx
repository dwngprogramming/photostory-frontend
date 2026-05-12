"use client";

import React, {createContext, useContext, useState} from "react";
import DemoNotifyModal from "@/components/Landing/DemoNotifyModal";
import {useRouter} from "@/libs/i18n/navigation";

const DemoNotifyContext = createContext<{ openDemoModal: () => void } | null>(null);

export function DemoNotifyProvider({children}: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const handleDemo = () => {
    setIsOpen(false);
    router.push("/demo/unwrap");
  };
  
  return (
    <DemoNotifyContext.Provider value={{openDemoModal: () => setIsOpen(true)}}>
      {children}
      <DemoNotifyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDemoPage={handleDemo}
      />
    </DemoNotifyContext.Provider>
  );
}

export function useDemoNotify() {
  const ctx = useContext(DemoNotifyContext);
  if (!ctx) throw new Error("useDemoNotify must be used within DemoNotifyProvider");
  return ctx;
}