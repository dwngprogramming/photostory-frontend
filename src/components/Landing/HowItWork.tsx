import {Step} from "@/types";
import StepCard from "@/components/Landing/StepCard";
import {useTranslations} from "next-intl";

const HowItWorks = ({steps}: {steps: Step[]}) => {
  const t = useTranslations('Landing.createYourAlbum');
  return (
    <section id="how-it-works"
             className="py-20 md:py-32 px-4 bg-gradient-to-b from-orange-50 via-amber-50 to-white dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-serif font-bold text-stone-800 dark:text-stone-100 text-3xl md:text-4xl lg:text-5xl mb-4">
            {t('title')}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-lg md:text-xl">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 max-w-6xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[16%] right-[16%] border-t-2 border-dashed border-amber-200 dark:border-amber-800/50 z-0"/>
          
          {steps.map((step, index) => (
            <StepCard key={index} {...step} delay={index * 150}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;