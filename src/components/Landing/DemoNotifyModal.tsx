"use client";

import { motion } from "framer-motion";
import { ArrowRight, Construction, X } from "lucide-react";
import ModalWrapper from "@/components/Common/ModalWrapper";
import {useTranslations} from "next-intl";

interface DemoNotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoPage: () => void;
}

export default function DemoNotifyModal({
                                          isOpen,
                                          onClose,
                                          onDemoPage,
                                        }: DemoNotifyModalProps) {
  
  const t = useTranslations("Common");
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} ariaLabel="Demo Notice">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 pb-0 text-center">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Construction className="w-6 h-6" />
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">
            {t("noticeBar.nowDemoOnly.title")}
          </h3>
          
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {t("noticeBar.nowDemoOnly.message")}
          </p>
        </div>
        
        {/* Actions */}
        <div className="p-6 flex flex-col gap-3">
          <button
            onClick={onDemoPage}
            className="w-full h-12 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {t("noticeBar.nowDemoOnly.linkText")} <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="w-full h-12 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-medium rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
          >
            {t("watchLater")}
          </button>
        </div>
      </motion.div>
    </ModalWrapper>
  );
}