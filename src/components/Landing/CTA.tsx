import React from "react";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";

const CTA = () => {
  const t = useTranslations('Landing.startPreserveMemories');
  const {ref, inView} = useScrollAnimation();
  
  return (
    <section id="cta" className="py-20 md:py-32 px-4 bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out transform ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <h2
          className="font-serif font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 drop-shadow-sm">
          {t('title')}
        </h2>
        <p className="text-white text-xl md:text-2xl opacity-90 mb-8 font-light">
          {t('subtitle')}
        </p>
        <button
          className="bg-white text-amber-600 font-semibold hover:bg-amber-50 hover:scale-105 px-8 py-4 rounded-xl shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto justify-center w-fit">
          {t('getStartedFree')} <ArrowRight className="w-5 h-5"/>
        </button>
        <p className="text-white mt-6 opacity-80">
          {t('noCreditCard')} • {t('noTimeLimit')} • {t('noHiddenFees')}
        </p>
        <p className="text-white text-xs mt-2 opacity-80">
          * {t('termsApply')}
        </p>
      </div>
    </section>
  );
};

export default CTA;