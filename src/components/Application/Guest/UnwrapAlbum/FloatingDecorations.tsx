import React from 'react';
import { Sparkles, Gift, Heart, Camera } from 'lucide-react';

const FloatingDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Large Blurred Gradient Orbs (Background Ambiance) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-orange-200/25 dark:bg-orange-900/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-amber-100/20 dark:bg-amber-950/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-orange-100/15 dark:bg-orange-950/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-amber-200/20 dark:bg-amber-900/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* 2. Floating Polaroid Photo Frames */}
      
      {/* Top Left Area */}
      <div className="absolute top-[8%] left-[5%] w-28 h-36 bg-white/50 dark:bg-stone-800/40 rounded-sm shadow-xl rotate-12 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden md:block" style={{ animationDelay: '0.5s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      <div className="absolute top-[18%] left-[18%] w-24 h-32 bg-white/45 dark:bg-stone-800/35 rounded-sm shadow-lg -rotate-6 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      
      {/* Top Right Area */}
      <div className="absolute top-[12%] right-[4%] w-32 h-40 bg-white/50 dark:bg-stone-800/40 rounded-sm shadow-xl rotate-12 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden md:block" style={{ animationDelay: '2s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      <div className="absolute top-[25%] right-[15%] w-26 h-34 bg-white/45 dark:bg-stone-800/35 rounded-sm shadow-lg rotate-6 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden lg:block" style={{ animationDelay: '3s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      
      {/* Middle Left Area */}
      <div className="absolute top-[45%] left-[3%] w-30 h-38 bg-white/50 dark:bg-stone-800/40 rounded-sm shadow-xl -rotate-12 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      
      {/* Middle Right Area */}
      <div className="absolute top-[50%] right-[6%] w-28 h-36 bg-white/50 dark:bg-stone-800/40 rounded-sm shadow-xl rotate-15 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden lg:block" style={{ animationDelay: '2.5s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      
      {/* Bottom Left Area */}
      <div className="absolute bottom-[15%] left-[5%] w-28 h-36 bg-white/50 dark:bg-stone-800/40 rounded-sm shadow-xl -rotate-6 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden md:block" style={{ animationDelay: '3.5s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      <div className="absolute bottom-[25%] left-[16%] w-24 h-32 bg-white/45 dark:bg-stone-800/35 rounded-sm shadow-lg rotate-10 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden lg:block" style={{ animationDelay: '1.8s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      
      {/* Bottom Right Area */}
      <div className="absolute bottom-[18%] right-[16%] w-26 h-34 bg-white/50 dark:bg-stone-800/40 rounded-sm shadow-xl rotate-8 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden md:block" style={{ animationDelay: '2.8s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      <div className="absolute bottom-[8%] right-[8%] w-24 h-32 bg-white/45 dark:bg-stone-800/35 rounded-sm shadow-lg -rotate-8 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float hidden xl:block" style={{ animationDelay: '4.5s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      
      {/* Mobile visible polaroids */}
      <div className="absolute top-[10%] right-[5%] w-20 h-26 bg-white/40 dark:bg-stone-800/30 rounded-sm shadow-lg rotate-12 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float md:hidden" style={{ animationDelay: '1s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      <div className="absolute bottom-[28%] left-[5%] w-20 h-26 bg-white/40 dark:bg-stone-800/30 rounded-sm shadow-lg -rotate-8 backdrop-blur-sm border border-stone-200/40 dark:border-stone-700/40 animate-float md:hidden" style={{ animationDelay: '0.5s' }}>
        <div className="w-full h-3/4 bg-stone-200/50 dark:bg-stone-700/30"></div>
      </div>
      
      {/* 3. Floating Sparkles/Stars */}
      <div className="absolute top-[10%] left-[18%] text-amber-400/40 dark:text-amber-600/25 animate-pulse" style={{ animationDuration: '3s' }}>
        <Sparkles size={20} />
      </div>
      <div className="absolute top-[15%] left-[25%] text-orange-400/35 dark:text-orange-600/20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <Sparkles size={16} />
      </div>
      <div className="absolute top-[8%] right-[22%] text-amber-300/30 dark:text-amber-700/20 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
        <Sparkles size={18} />
      </div>
      <div className="absolute top-[20%] right-[30%] text-orange-300/35 dark:text-orange-700/20 animate-pulse hidden md:block" style={{ animationDuration: '4.5s', animationDelay: '2s' }}>
        <Sparkles size={14} />
      </div>
      
      <div className="absolute top-[35%] left-[15%] text-amber-400/35 dark:text-amber-600/20 animate-pulse hidden lg:block" style={{ animationDuration: '3.8s', animationDelay: '1.5s' }}>
        <Sparkles size={16} />
      </div>
      <div className="absolute top-[40%] left-[22%] text-orange-400/30 dark:text-orange-600/18 animate-pulse hidden md:block" style={{ animationDuration: '4.2s', animationDelay: '2.5s' }}>
        <Sparkles size={14} />
      </div>
      <div className="absolute top-[45%] right-[18%] text-amber-300/35 dark:text-amber-700/22 animate-pulse hidden lg:block" style={{ animationDuration: '3.3s', animationDelay: '1.8s' }}>
        <Sparkles size={18} />
      </div>
      <div className="absolute top-[38%] right-[25%] text-orange-300/30 dark:text-orange-700/18 animate-pulse hidden md:block" style={{ animationDuration: '4.8s', animationDelay: '3s' }}>
        <Sparkles size={15} />
      </div>
      <div className="absolute top-[50%] left-[20%] text-amber-400/30 dark:text-amber-600/18 animate-pulse hidden xl:block" style={{ animationDuration: '3.6s', animationDelay: '2.2s' }}>
        <Sparkles size={12} />
      </div>
      <div className="absolute top-[55%] right-[28%] text-orange-400/35 dark:text-orange-600/20 animate-pulse hidden xl:block" style={{ animationDuration: '4.4s', animationDelay: '3.5s' }}>
        <Sparkles size={16} />
      </div>
      
      <div className="absolute bottom-[20%] left-[20%] text-amber-400/35 dark:text-amber-600/22 animate-pulse" style={{ animationDuration: '3.7s', animationDelay: '1.2s' }}>
        <Sparkles size={18} />
      </div>
      <div className="absolute bottom-[15%] left-[28%] text-orange-400/30 dark:text-orange-600/18 animate-pulse hidden md:block" style={{ animationDuration: '4.1s', animationDelay: '2.8s' }}>
        <Sparkles size={14} />
      </div>
      <div className="absolute bottom-[25%] right-[25%] text-amber-300/35 dark:text-amber-700/20 animate-pulse" style={{ animationDuration: '3.4s', animationDelay: '0.8s' }}>
        <Sparkles size={16} />
      </div>
      <div className="absolute bottom-[18%] right-[32%] text-orange-300/30 dark:text-orange-700/18 animate-pulse hidden md:block" style={{ animationDuration: '4.6s', animationDelay: '3.2s' }}>
        <Sparkles size={15} />
      </div>
      <div className="absolute bottom-[12%] left-[25%] text-amber-400/30 dark:text-amber-600/18 animate-pulse hidden lg:block" style={{ animationDuration: '3.9s', animationDelay: '1.6s' }}>
        <Sparkles size={13} />
      </div>
      <div className="absolute bottom-[8%] right-[28%] text-orange-400/35 dark:text-orange-600/20 animate-pulse hidden lg:block" style={{ animationDuration: '4.3s', animationDelay: '2.4s' }}>
        <Sparkles size={17} />
      </div>
      
      <div className="absolute top-[5%] left-[10%] text-amber-300/25 dark:text-amber-700/15 animate-pulse hidden xl:block" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }}>
        <Sparkles size={12} />
      </div>
      <div className="absolute top-[5%] right-[12%] text-orange-300/25 dark:text-orange-700/15 animate-pulse hidden xl:block" style={{ animationDuration: '4.7s', animationDelay: '3.8s' }}>
        <Sparkles size={14} />
      </div>
      <div className="absolute bottom-[5%] left-[15%] text-amber-300/25 dark:text-amber-700/15 animate-pulse hidden xl:block" style={{ animationDuration: '3.5s', animationDelay: '2.1s' }}>
        <Sparkles size={13} />
      </div>
      <div className="absolute bottom-[5%] right-[15%] text-orange-300/25 dark:text-orange-700/15 animate-pulse hidden xl:block" style={{ animationDuration: '4.9s', animationDelay: '4.2s' }}>
        <Sparkles size={15} />
      </div>
      
      {/* 4. Floating Gift/Heart Icons */}
      <div className="absolute top-[22%] left-[8%] text-amber-400/25 dark:text-amber-600/15 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
        <Gift size={24} />
      </div>
      <div className="absolute top-[65%] right-[12%] text-orange-400/25 dark:text-orange-600/15 animate-float hidden lg:block" style={{ animationDelay: '3.5s' }}>
        <Heart size={22} />
      </div>
      <div className="absolute bottom-[35%] left-[6%] text-amber-300/20 dark:text-amber-700/12 animate-float hidden xl:block" style={{ animationDelay: '1.5s' }}>
        <Camera size={20} />
      </div>
      <div className="absolute top-[48%] right-[8%] text-orange-300/25 dark:text-orange-700/15 animate-float hidden xl:block" style={{ animationDelay: '4s' }}>
        <Gift size={20} />
      </div>
      <div className="absolute bottom-[48%] left-[10%] text-amber-400/20 dark:text-amber-600/12 animate-float hidden xl:block" style={{ animationDelay: '2.8s' }}>
        <Heart size={18} />
      </div>
      <div className="absolute top-[72%] right-[20%] text-orange-400/20 dark:text-orange-600/12 animate-float hidden lg:block" style={{ animationDelay: '3.2s' }}>
        <Camera size={22} />
      </div>
      
      {/* 5. Small Floating Circles/Dots */}
      <div className="absolute top-[12%] left-[30%] w-2 h-2 bg-amber-400/30 dark:bg-amber-600/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-[18%] left-[35%] w-1.5 h-1.5 bg-orange-400/25 dark:bg-orange-600/15 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-[25%] left-[40%] w-2.5 h-2.5 bg-amber-300/25 dark:bg-amber-700/15 rounded-full animate-float hidden md:block" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute top-[32%] left-[28%] w-2 h-2 bg-orange-300/30 dark:bg-orange-700/18 rounded-full animate-float hidden md:block" style={{ animationDelay: '3.5s' }}></div>
      
      <div className="absolute top-[15%] right-[35%] w-2 h-2 bg-amber-400/25 dark:bg-amber-600/15 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[22%] right-[40%] w-1.5 h-1.5 bg-orange-400/30 dark:bg-orange-600/18 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[28%] right-[32%] w-2.5 h-2.5 bg-amber-300/20 dark:bg-amber-700/12 rounded-full animate-float hidden md:block" style={{ animationDelay: '3s' }}></div>
      
      <div className="absolute top-[42%] left-[32%] w-2 h-2 bg-orange-400/25 dark:bg-orange-600/15 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1.8s' }}></div>
      <div className="absolute top-[48%] left-[38%] w-1.5 h-1.5 bg-amber-400/30 dark:bg-amber-600/18 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2.8s' }}></div>
      <div className="absolute top-[52%] right-[38%] w-2.5 h-2.5 bg-orange-300/25 dark:bg-orange-700/15 rounded-full animate-float hidden lg:block" style={{ animationDelay: '3.8s' }}></div>
      <div className="absolute top-[58%] right-[42%] w-2 h-2 bg-amber-300/30 dark:bg-amber-700/18 rounded-full animate-float hidden lg:block" style={{ animationDelay: '4.8s' }}></div>
      
      <div className="absolute bottom-[28%] left-[35%] w-2 h-2 bg-amber-400/25 dark:bg-amber-600/15 rounded-full animate-float" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute bottom-[22%] left-[42%] w-1.5 h-1.5 bg-orange-400/30 dark:bg-orange-600/18 rounded-full animate-float" style={{ animationDelay: '2.2s' }}></div>
      <div className="absolute bottom-[18%] right-[38%] w-2.5 h-2.5 bg-amber-300/25 dark:bg-amber-700/15 rounded-full animate-float hidden md:block" style={{ animationDelay: '3.2s' }}></div>
      <div className="absolute bottom-[12%] right-[42%] w-2 h-2 bg-orange-300/30 dark:bg-orange-700/18 rounded-full animate-float hidden md:block" style={{ animationDelay: '4.2s' }}></div>
      
      <div className="absolute top-[35%] left-[45%] w-1.5 h-1.5 bg-amber-400/20 dark:bg-amber-600/12 rounded-full animate-float hidden xl:block" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute top-[62%] left-[32%] w-2 h-2 bg-orange-400/25 dark:bg-orange-600/15 rounded-full animate-float hidden xl:block" style={{ animationDelay: '3.5s' }}></div>
      <div className="absolute bottom-[38%] right-[35%] w-1.5 h-1.5 bg-amber-300/20 dark:bg-amber-700/12 rounded-full animate-float hidden xl:block" style={{ animationDelay: '4.5s' }}></div>
      <div className="absolute bottom-[45%] right-[48%] w-2.5 h-2.5 bg-orange-300/25 dark:bg-orange-700/15 rounded-full animate-float hidden xl:block" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="absolute top-[8%] left-[5%] w-2 h-2 bg-amber-400/20 dark:bg-amber-600/12 rounded-full animate-float hidden lg:block" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute top-[8%] right-[5%] w-1.5 h-1.5 bg-orange-400/20 dark:bg-orange-600/12 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1.8s' }}></div>
      <div className="absolute bottom-[8%] left-[8%] w-2 h-2 bg-amber-300/20 dark:bg-amber-700/12 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2.8s' }}></div>
      <div className="absolute bottom-[8%] right-[8%] w-1.5 h-1.5 bg-orange-300/20 dark:bg-orange-700/12 rounded-full animate-float hidden lg:block" style={{ animationDelay: '3.8s' }}></div>
      
      {/* 6. Subtle Grid/Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
           style={{ backgroundImage: 'radial-gradient(circle, #78716C 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
      
      {/* 7. Floating Ribbon/Banner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent dark:from-amber-900/10 rotate-45 -translate-x-16 -translate-y-16 hidden xl:block"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-200/20 to-transparent dark:from-orange-900/10 -rotate-45 translate-x-16 -translate-y-16 hidden xl:block"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-200/20 to-transparent dark:from-amber-900/10 -rotate-45 -translate-x-16 translate-y-16 hidden xl:block"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-200/20 to-transparent dark:from-orange-900/10 rotate-45 translate-x-16 translate-y-16 hidden xl:block"></div>
    </div>
  );
};

export default FloatingDecorations;