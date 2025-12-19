"use client";

import React from 'react';
import Link from 'next/link';

import {Book, LibraryBig, LogOut, Settings, User as UserIcon, Users, X} from 'lucide-react';
import ThemeToggle from '@/components/Common/ThemeToggle';
import {User} from '@/types';
import {usePathname} from "@/libs/i18n/navigation";
import {useTranslations} from "next-intl";

interface SidebarProps {
  currentUser: User;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ currentUser, isOpen, onCloseMobile }: SidebarProps) {
  const t = useTranslations('App.User');
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname.startsWith(path);
  
  const menuItems = [
    { label: t('myAlbums.title'), icon: <LibraryBig size={20} />, href: '/my-albums'},
    { label: t('sharedWithMe'), icon: <Users size={20} />, href: '/shared-with-me' },
    { label: t('settings'), icon: <Settings size={20} />, href: '/settings' },
  ];
  
  return (
    <>
      {/* Overlay cho Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}
      
      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-stone-100 dark:border-stone-800">
          <Link href="/public" className="flex items-center gap-2" onClick={onCloseMobile}>
            <Book className="w-8 h-8 text-amber-500" />
            <span className="text-xl font-bold font-serif text-stone-800 dark:text-stone-100">
              Photostory
            </span>
          </Link>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex text-sm items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive(item.href)
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Footer: User Profile & Theme Toggle */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 space-y-4">
          
          {/* Theme Toggle Area */}
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Appearance</span>
            <ThemeToggle />
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold overflow-hidden">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover"/>
              ) : (
                <UserIcon size={20} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                {currentUser.email}
              </p>
            </div>
            <button className="text-stone-400 hover:text-red-500 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}