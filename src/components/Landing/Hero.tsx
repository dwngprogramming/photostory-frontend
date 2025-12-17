"use client";

import React from 'react';
import AlbumIllustration from '@/components/Landing/AlbumIllustration';
import {useScrollAnimation} from '@/hooks/useScrollAnimation';
import {ArrowRight, Play} from 'lucide-react';

const Hero = () => {
  const {ref, inView} = useScrollAnimation();
  
  return (
    <section id="hero"
             className="relative pt-32 pb-20 md:pt-36 md:pb-32 px-4 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 lg:gap-20 items-center">
        
        {/* Left Column */}
        <div
          ref={ref}
          className={`flex flex-col items-start transition-all duration-700 ease-out transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} relative z-10`}
        >
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/50">
            ✨ Free - No Credit Card Required
          </span>
          <h1
            className="font-serif font-bold text-stone-800 dark:text-stone-100 text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Preserve Your <span className="text-amber-500 italic">Memories</span> in a Beautiful Digital Album
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
            Create stunning photo diaries with stories, emotions, and moments that matter. Share them with loved ones
            through a simple code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 hover:scale-105 shadow-md hover:shadow-soft-lg transition-all duration-200 flex items-center justify-center gap-2">
              Start Creating Free <ArrowRight className="w-5 h-5"/>
            </button>
            <button
              className="border-2 border-amber-400 text-amber-600 dark:text-amber-400 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200 flex items-center justify-center gap-2">
              <Play className="w-5 h-5"/> View Demo
            </button>
          </div>
        </div>
        
        {/* Right Column */}
        <div
          className={`transition-all duration-1000 delay-300 ease-out transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} mt-8 md:mt-12 lg:mt-0 w-full`}>
          <AlbumIllustration/>
        </div>
      </div>
    </section>
  );
}

export default Hero;