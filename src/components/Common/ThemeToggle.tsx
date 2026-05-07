import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import {twMerge} from "tailwind-merge";
import {clsx} from "clsx";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Hydration fix
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={twMerge("text-base w-[3.5em] h-[2em] shrink-0", className)}/>;
  
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={twMerge(
        "text-base relative flex items-center w-[3.5em] h-[2em] shrink-0 rounded-full bg-stone-300 dark:bg-stone-700 p-[0.25em] transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner",
        className
      )}
      aria-label="Toggle theme"
      role="switch"
      aria-checked={isDark}
    >
      {/* Background Icons */}
      <div className="flex justify-between items-center w-full h-full px-[0.125em] z-0">
        <Sun className="w-[1em] h-[1em] text-stone-500/70 dark:text-stone-400/70" />
        <Moon className="w-[1em] h-[1em] text-stone-500/70 dark:text-stone-400/70" />
      </div>
      
      {/* Sliding Thumb */}
      <div
        className={clsx(
          "absolute top-[0.25em] left-[0.25em] w-[1.5em] h-[1.5em] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.15)] dark:shadow-none transition-transform duration-300 ease-in-out flex items-center justify-center z-10",
          isDark ? "translate-x-[1.5em] bg-stone-800" : "translate-x-0 bg-white"
        )}
      >
        <Sun 
          className={clsx(
            "absolute w-[1em] h-[1em] text-amber-500 transition-all duration-300",
            isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
          )} 
        />
        <Moon 
          className={clsx(
            "absolute w-[1em] h-[1em] text-amber-300 transition-all duration-300",
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
          )} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;