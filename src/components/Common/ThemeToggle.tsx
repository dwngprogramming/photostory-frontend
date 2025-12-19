import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";

const ThemeToggle: React.FC = () => {
  // Thay đổi logic: dùng setTheme của next-themes
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Hydration fix
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10"/>;
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 cursor-pointer rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-600 transition-all duration-200 flex items-center justify-center focus:ring-2 focus:ring-amber-400 focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5"/>
      ) : (
        <Moon className="w-5 h-5"/>
      )}
    </button>
  );
};

export default ThemeToggle;