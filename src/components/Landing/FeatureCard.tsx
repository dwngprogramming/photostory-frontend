import {Feature} from "@/types";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import React from "react";

const FeatureCard: React.FC<Feature & { delay: number }> = ({icon, title, description, delay}) => {
  const {ref, inView} = useScrollAnimation({delay});
  
  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      className={`bg-white dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-700 shadow-md dark:shadow-dark hover:-translate-y-2 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-soft-lg dark:hover:shadow-dark-lg transition-all duration-500 ease-out transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div
        className="bg-amber-50 dark:bg-amber-900/20 w-16 h-16 rounded-lg flex items-center justify-center text-amber-500 mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-stone-800 dark:text-stone-100 mb-4 font-serif">{title}</h3>
      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;