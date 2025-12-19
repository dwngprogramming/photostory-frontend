"use client"

import {useEffect, useState} from "react";
import {Book, Menu, X} from "lucide-react";
import {NavLink} from "@/types";
import ThemeToggle from "@/components/Common/ThemeToggle";
import {useTranslations} from "next-intl";

const Navbar = ({navLinks}: {navLinks: NavLink[]}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tLanding = useTranslations('Landing');
  const tCommon = useTranslations('Common');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 md:h-20 flex items-center ${
        isScrolled
          ? 'bg-white/90 dark:bg-stone-950/90 backdrop-blur-md shadow-sm border-b border-stone-200 dark:border-stone-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Book className="w-8 h-8 text-amber-500"/>
          <span className="text-xl font-bold text-stone-800 dark:text-stone-100 font-serif">Photostory</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-stone-600 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#"
             className="text-stone-600 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 font-medium"
          >
            {tCommon('login')}
          </a>
          <ThemeToggle/>
          <button
            className="bg-amber-500 text-white px-6 py-2.5 rounded-lg hover:bg-amber-600 hover:scale-105 transition-all duration-200 font-semibold shadow-sm focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none">
            {tLanding('getStarted')}
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle/>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-stone-800 dark:text-stone-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            aria-label={`${tCommon('openMenu')}`}
          >
            <Menu className="w-6 h-6"/>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-stone-900/30 dark:bg-stone-950/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-stone-900 shadow-xl dark:shadow-dark-xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-stone-800 dark:text-stone-100 hover:text-amber-500 dark:hover:text-amber-400"
              aria-label={`${tCommon('closeMenu')}`}
            >
              <X className="w-6 h-6"/>
            </button>
            
            <div className="mt-12 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium text-stone-800 dark:text-stone-100 hover:text-amber-500 dark:hover:text-amber-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-stone-200 dark:border-stone-800"/>
              <a href="#"
                 className="text-lg font-medium text-stone-800 dark:text-stone-100 hover:text-amber-500 dark:hover:text-amber-400">
                Login
              </a>
              <button
                className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-all duration-200 font-semibold shadow-sm w-full">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;