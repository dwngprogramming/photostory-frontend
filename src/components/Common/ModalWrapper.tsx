"use client";

/**
 * Modal "vỏ" dùng chung — xử lý portal, backdrop, focus trap, ESC key.
 * Không quyết định UI hay animation của content — để children tự làm.
 *
 * @example
 * <ModalWrapper isOpen={isOpen} onClose={onClose}>
 *   <motion.div
 *     initial={{ opacity: 0, scale: 0.95 }}
 *     animate={{ opacity: 1, scale: 1 }}
 *     exit={{ opacity: 0, scale: 0.95 }}
 *     className="w-full max-w-md bg-white rounded-2xl p-6"
 *   >
 *     ...
 *   </motion.div>
 * </ModalWrapper>
 *
 * @note Children nên có `exit` animation, không thì content mất đột ngột khi đóng.
 * @note Close button đặt bên trong children, không phải trong wrapper.
 * @note scroll bên trong modal → `overflow-y-auto` trên element con, không phải wrapper.
 */

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  /** Default: true — tắt khi modal yêu cầu user phải thao tác (PIN, confirm...) */
  closeOnBackdrop?: boolean;
  /** Default: "bg-black/40 backdrop-blur-sm" */
  overlayClassName?: string;
  /** Default: "Dialog" */
  ariaLabel?: string;
};

export default function ModalWrapper({
                                       isOpen,
                                       onClose,
                                       children,
                                       closeOnBackdrop = true,
                                       overlayClassName = "bg-black/40 backdrop-blur-sm",
                                       ariaLabel = "Dialog",
                                     }: ModalWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  
  // SSR guard — đúng cách
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isOpen) return;
    
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    
    // Focus element đầu tiên trong modal
    const focusFirst = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const focusables = el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      focusables.length ? focusables[0].focus() : el.focus();
    };
    
    const id = setTimeout(focusFirst, 0);
    
    const onKey = (e: KeyboardEvent) => {
      // ESC để đóng
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      
      // Focus trap
      if (e.key === "Tab") {
        const el = wrapperRef.current;
        if (!el) return;
        
        const focusables = Array.from(
          el.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((f) => f.offsetParent !== null);
        
        if (!focusables.length) {
          e.preventDefault();
          return;
        }
        
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        
        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    
    document.addEventListener("keydown", onKey, true);
    
    return () => {
      clearTimeout(id);
      document.removeEventListener("keydown", onKey, true);
      try {
        previouslyFocused.current?.focus();
      } catch {
        // ignore
      }
    };
  }, [isOpen, onClose]);
  
  if (!mounted) return null;
  
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          ref={wrapperRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          tabIndex={-1}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 outline-none"
        >
          {/* Backdrop — wrapper chỉ animate cái này */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 ${overlayClassName}`}
            onClick={() => closeOnBackdrop && onClose()}
          />
          
          {/* Children tự quyết định UI và animation của mình */}
          <div
            className="relative z-10 w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}