"use client";

import React, {useMemo, useState} from 'react';
import {toast} from 'sonner';
import {LayoutGrid, List, Plus, Search, X} from 'lucide-react';

// Components
import {
  AlbumGrid,
  AlbumGridSkeleton,
  AlbumList,
  EmptyState,
  LoadError,
  NoResults
} from '@/components/Application/User/MyAlbums/AlbumComponents';
import StatsOverview from "@/components/Application/User/MyAlbums/StatsOverview";
// Data & Types
import {Album, AlbumPrivacy, Stats} from '@/types';
import {MOCK_STATS} from '@/mock_data/constants';
import {useMyAlbums} from "@/hooks/api/useMyAlbums";
import {useTranslations} from "next-intl";

type PrivacyFilter = 'all' | AlbumPrivacy;
type SortKey = 'newest' | 'oldest' | 'title' | 'photos';
type ViewMode = 'grid' | 'list';

const PRIVACY_FILTERS: PrivacyFilter[] = ['all', 'public', 'private'];
const SORT_KEYS: SortKey[] = ['newest', 'oldest', 'title', 'photos'];

const compareAlbums: Record<SortKey, (a: Album, b: Album) => number> = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
  title: (a, b) => a.title.localeCompare(b.title),
  photos: (a, b) => b.photoCount - a.photoCount,
};

const toStats = (albums: Album[]): Stats => ({
  myAlbums: albums.length,
  totalPhotos: albums.reduce((sum, album) => sum + album.photoCount, 0),
  publicAlbums: albums.filter((album) => album.privacy === 'public').length,
  privateAlbums: albums.filter((album) => album.privacy === 'private').length,
  // Backend chưa trả dung lượng: tạm dùng số mẫu
  storageUsed: albums.length > 0 ? MOCK_STATS.storageUsed : 0,
  storageTotal: MOCK_STATS.storageTotal,
});

export default function MyAlbums() {
  const t = useTranslations('App.User.myAlbums');
  const {data: albums, isPending, isError, refetch} = useMyAlbums();

  const [query, setQuery] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const stats = useMemo(() => albums && toStats(albums), [albums]);

  const visibleAlbums = useMemo(() => {
    if (!albums) return [];
    const keyword = query.trim().toLocaleLowerCase();
    return albums
      .filter((album) => privacy === 'all' || album.privacy === privacy)
      .filter((album) => !keyword || album.title.toLocaleLowerCase().includes(keyword))
      .sort(compareAlbums[sortKey]);
  }, [albums, query, privacy, sortKey]);

  const hasAlbums = !!albums && albums.length > 0;

  // Chưa có màn tạo album và trình xem album của chủ sở hữu
  const handleCreateAlbum = () => toast.info(t('createComingSoon'));
  const handleDropFiles = () => toast.info(t('createComingSoon'));
  const handleOpenAlbum = () => toast.info(t('openComingSoon'));

  const resetFilters = () => {
    setQuery('');
    setPrivacy('all');
  };

  const renderContent = () => {
    if (isPending) return <AlbumGridSkeleton/>;
    if (isError) return <LoadError onRetry={() => refetch()}/>;
    if (!hasAlbums) return <EmptyState onCreateAlbum={handleCreateAlbum} onDropFiles={handleDropFiles}/>;
    if (visibleAlbums.length === 0) return <NoResults query={query.trim()} onReset={resetFilters}/>;
    return viewMode === 'grid'
      ? <AlbumGrid albums={visibleAlbums} onOpenAlbum={handleOpenAlbum}/>
      : <AlbumList albums={visibleAlbums} onOpenAlbum={handleOpenAlbum}/>;
  };

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-serif font-bold text-stone-900 dark:text-white mb-2">
            {t('title')}
          </h2>
          <p className="text-stone-500 dark:text-stone-400">
            {t('subtitle')}
          </p>
        </div>
        {hasAlbums && (
          <button
            onClick={handleCreateAlbum}
            className="self-start md:self-auto flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium shadow-soft-lg hover:shadow-soft-xl transition-all"
          >
            <Plus className="w-5 h-5"/>
            {t('createAlbum')}
          </button>
        )}
      </div>

      {/* Stats: ẩn khi lỗi để không hiện số sai */}
      {!isError && <StatsOverview stats={stats}/>}

      {/* Toolbar */}
      {hasAlbums && (
        <div className="flex flex-wrap gap-3 items-center justify-between bg-white dark:bg-stone-900 p-3 sm:p-4 rounded-lg border border-stone-200 dark:border-stone-800 shadow-sm md:sticky md:top-0 z-10">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"/>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              aria-label={t('search.label')}
              className="w-full h-10 pl-10 pr-10 rounded-lg bg-stone-100 dark:bg-stone-800 border-none focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t('search.clear')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700"
              >
                <X className="w-4 h-4"/>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Privacy filter */}
            <div role="radiogroup" aria-label={t('filter.label')}
                 className="flex p-1 rounded-lg bg-stone-100 dark:bg-stone-800">
              {PRIVACY_FILTERS.map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={privacy === value}
                  onClick={() => setPrivacy(value)}
                  className={`h-8 px-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    privacy === value
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  {t(`filter.${value}`)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              aria-label={t('sort.label')}
              className="h-10 pl-3 pr-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-200 border-none focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {SORT_KEYS.map((key) => (
                <option key={key} value={key}>{t(`sort.${key}`)}</option>
              ))}
            </select>

            <div className="w-px h-6 bg-stone-300 dark:bg-stone-700 mx-1 hidden sm:block"/>

            {/* View mode */}
            {([['grid', LayoutGrid], ['list', List]] as const).map(([mode, Icon]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-label={t(`view.${mode}`)}
                aria-pressed={viewMode === mode}
                className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  viewMode === mode
                    ? 'bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Icon className="w-5 h-5"/>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}
