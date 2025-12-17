import {Step} from "@/types";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import React from "react";

const StepCard: React.FC<Step & { delay: number }> = ({number, icon, title, description, delay}) => {
  const {ref, inView} = useScrollAnimation({delay});
  
  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      className={`flex flex-col items-center text-center relative z-10 transition-all duration-700 ease-out transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div
        className="text-5xl font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-400 dark:border-amber-700/50 rounded-full w-20 h-20 flex items-center justify-center mb-6 font-serif shadow-sm">
        {number}
      </div>
      <div
        className="bg-white dark:bg-stone-900 shadow-sm dark:shadow-dark rounded-lg p-4 w-16 h-16 mb-6 flex items-center justify-center text-amber-500 border border-stone-100 dark:border-stone-800">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-stone-800 dark:text-stone-100 mb-4 font-serif">{title}</h3>
      <p className="text-stone-600 dark:text-stone-300 leading-relaxed max-w-xs">{description}</p>
    </div>
  );
};

export default StepCard;