"use client";

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Application/User/Layout/Sidebar';
import { CURRENT_USER } from '@/mock_data/constants';

export default function PhotostoryShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-950">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center px-4 z-30 transition-colors duration-300">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 text-stone-600 dark:text-stone-300"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-serif font-bold text-lg ml-2 text-stone-800 dark:text-stone-100">
          Photostory
        </span>
      </div>
      
      {/* Sidebar Component */}
      <Sidebar
        currentUser={CURRENT_USER}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />
      
      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col h-full relative transition-colors duration-300">
        <div className="flex-1 overflow-y-auto pt-16 lg:pt-0 scroll-smooth">
          <div className="max-w-7xl mx-auto p-6 lg:p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}