"use client";

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Filter, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

// Components
import { EmptyState, AlbumGrid } from '@/components/Application/User/MyAlbums/AlbumComponents';
// import DiaryModal from './DiaryModal';

// Data & Types
import { Album } from '@/types';
import { MOCK_STATS, INITIAL_ALBUMS } from '@/mock_data/constants';
import StatsOverview from "@/components/Application/User/MyAlbums/StatsOverview";
import {useTranslations} from "next-intl";

export default function MyAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [stats, setStats] = useState(MOCK_STATS);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const t = useTranslations('App');
  
  const handleCreateAlbum = () => {
    setDroppedFiles([]);
    setIsDiaryOpen(true);
  };
  
  const handleDropFiles = (files: File[]) => {
    setDroppedFiles(files);
    setIsDiaryOpen(true);
  };
  
  const handleSaveAlbum = (newAlbumData: Partial<Album>) => {
    const newAlbum: Album = {
      id: Math.random().toString(36).substr(2, 9),
      title: newAlbumData.title || 'Untitled',
      coverImage: newAlbumData.coverImage || 'https://picsum.photos/800/600',
      photoCount: newAlbumData.photoCount || 0,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      privacy: newAlbumData.privacy || 'private',
      pages: newAlbumData.pages || []
    };
    
    setAlbums([newAlbum, ...albums]);
    setStats(prev => ({
      ...prev,
      myAlbums: prev.myAlbums + 1,
      totalPhotos: prev.totalPhotos + newAlbum.photoCount
    }));
    toast.success('Album saved successfully!');
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-2">
            {t('myAlbums.title')}
          </h2>
          <p className="text-stone-500 dark:text-stone-400">
            {t('myAlbums.subtitle')}
          </p>
        </div>
        {albums.length > 0 && (
          <button
            onClick={handleCreateAlbum}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium shadow-soft-lg hover:shadow-soft-xl transition-all transform hover:-translate-y-0.5"
          >
            + Create Album
          </button>
        )}
      </div>
      
      {/* Stats */}
      <StatsOverview stats={stats} />
      
      {/* Toolbar (Search, Filter...) */}
      {albums.length > 0 && (
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white dark:bg-stone-900 p-4 rounded-lg border border-stone-200 dark:border-stone-800 shadow-sm sticky top-0 z-10">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search albums..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 border-none focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100 placeholder-stone-400"
            />
            {/* SVG Icon Search */}
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"><Filter className="w-5 h-5" /></button>
            <button className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"><ArrowUpDown className="w-5 h-5" /></button>
            <div className="w-px h-6 bg-stone-300 dark:bg-stone-700 mx-1 self-center" />
            <button className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400"><LayoutGrid className="w-5 h-5" /></button>
            <button className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"><List className="w-5 h-5" /></button>
          </div>
        </div>
      )}
      
      {/* Main Grid Content */}
      {albums.length === 0 ? (
        <EmptyState onCreateAlbum={handleCreateAlbum} onDropFiles={handleDropFiles} />
      ) : (
        <AlbumGrid albums={albums} onOpenAlbum={(a) => toast(`Opened ${a.title}`)} />
      )}
      
      {/* Create Album Modal */}
      {/*{isDiaryOpen && (*/}
      {/*  <DiaryModal*/}
      {/*    onClose={() => setIsDiaryOpen(false)}*/}
      {/*    onSave={handleSaveAlbum}*/}
      {/*    initialFiles={droppedFiles}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
}