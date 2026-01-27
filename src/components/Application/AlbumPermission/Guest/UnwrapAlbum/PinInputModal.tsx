import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowRight, Loader2, Lock, X} from "lucide-react";
import {useTranslations} from "next-intl";

interface PinInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: (pin: string) => void;
}

const PinInputModal = ({isOpen, onClose, isLoading, onSubmit}: PinInputModalProps) => {
  const t = useTranslations("App.Guest.unwrap.pin");
  const [pin, setPin] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim().length > 0) {
      onSubmit(pin);
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}} // Sẽ biến mất cùng lúc với Modal
              onClick={onClose}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{opacity: 0, scale: 0.95, y: 20}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.95, y: 20}}
              transition={{type: "spring", duration: 0.5}}
              className="fixed w-full max-w-md pointer-events-auto bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 pb-0 text-center">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5"/>
                </button>
                
                <div
                  className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6"/>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100">
                  {t("title")}
                </h3>
                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  {t("description")}
                </p>
              </div>
              
              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="password"
                    autoFocus
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={t("placeholder")}
                    maxLength={6}
                    className="w-full h-12 px-4 text-center text-lg tracking-[0.5em] font-bold bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder:tracking-normal placeholder:font-normal"
                  />
                  
                  <button
                    type="submit"
                    disabled={isLoading || !pin.trim()}
                    className="w-full h-12 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin"/>
                    ) : (
                      <>
                        {t("submit")} <ArrowRight className="w-4 h-4"/>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PinInputModal;