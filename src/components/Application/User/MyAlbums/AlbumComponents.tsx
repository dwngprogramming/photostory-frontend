import {AlertCircle, Calendar, FolderPlus, Globe, Image as ImageIcon, KeyRound, Plus, Users} from "lucide-react";
import {Album} from "@/types";
import React from "react";
import {useDropzone} from "react-dropzone";
import {useFormatter, useTranslations} from "next-intl";

// --- EMPTY STATE ---
interface EmptyStateProps {
  onCreateAlbum: () => void;
  onDropFiles: (files: File[]) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateAlbum, onDropFiles }) => {
  const t = useTranslations('App.User.myAlbums');
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFiles,
    accept: { 'image/*': [], 'video/*': [] },
    noClick: true // We want the button to trigger creation, drag to trigger drop
  });

  return (
    <div
      {...getRootProps()}
      className={`
        w-full min-h-[400px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all duration-300
        ${isDragActive
        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-900/10'
        : 'border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900/50'
      }
      `}
    >
      <input {...getInputProps()} />
      <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-stone-800 flex items-center justify-center mb-6 text-amber-500 shadow-soft-lg">
        <FolderPlus className="w-10 h-10" />
      </div>
      <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-2 text-center">
        {isDragActive ? t('empty.dropPhoto') : t('empty.noAlbums')}
      </h3>
      <p className="text-stone-500 dark:text-stone-400 text-center max-w-xl mb-6">
        {t('empty.description')}
      </p>
      <div className="flex gap-4">
        <button
          onClick={onCreateAlbum}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-lg hover:shadow-soft-xl transition-all font-medium"
        >
          <Plus className="w-5 h-5" />
          {t('createAlbum')}
        </button>
      </div>
    </div>
  );
};

// --- SHARED PIECES ---
// Bảo mật tăng dần: công khai xanh lá, có mã PIN hổ phách, chỉ người được mời xanh dương
const PRIVACY_TONES = {
  // Nền nhạt, chữ và viền đậm hơn cùng tông màu
  onImage: {
    PUBLIC: 'bg-emerald-50/75 border-emerald-500/50 text-emerald-800',
    PIN_PROTECTED: 'bg-amber-50/75 border-amber-500/50 text-amber-900',
    INVITE_ONLY: 'bg-sky-50/75 border-sky-500/50 text-sky-800',
  },
  plain: {
    PUBLIC: 'bg-emerald-500/5 border-emerald-500/40 text-emerald-700 dark:bg-emerald-400/5 dark:border-emerald-400/40 dark:text-emerald-300',
    PIN_PROTECTED: 'bg-amber-500/5 border-amber-500/40 text-amber-700 dark:bg-amber-400/5 dark:border-amber-400/40 dark:text-amber-300',
    INVITE_ONLY: 'bg-sky-500/5 border-sky-500/40 text-sky-700 dark:bg-sky-400/5 dark:border-sky-400/40 dark:text-sky-300',
  },
} as const;

const PrivacyLabel = ({privacy, variant, className = ''}: {
  privacy: Album['privacy'],
  variant: keyof typeof PRIVACY_TONES,
  className?: string
}) => {
  const t = useTranslations('App.User.myAlbums.privacy');
  const Icon = {PUBLIC: Globe, PIN_PROTECTED: KeyRound, INVITE_ONLY: Users}[privacy];
  return (
    <span className={`inline-flex items-center gap-1 border ${PRIVACY_TONES[variant][privacy]} ${className}`}>
      <Icon className="w-3 h-3"/>
      {t(privacy)}
    </span>
  );
};

const AlbumCover = ({album, compact = false, className = ''}: { album: Album, compact?: boolean, className?: string }) => {
  const t = useTranslations('App.User.myAlbums');
  if (!album.coverImage) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-stone-100 dark:bg-stone-800 text-stone-400 ${className}`}
        title={t('noCover')}
      >
        <ImageIcon className={compact ? 'w-5 h-5' : 'w-8 h-8'}/>
        {!compact && <span className="text-xs">{t('noCover')}</span>}
      </div>
    );
  }
  return (
    <img
      src={album.coverImage}
      alt=""
      className={`object-cover ${className}`}
    />
  );
};

const AlbumMeta = ({album}: { album: Album }) => {
  const t = useTranslations('App.User.myAlbums');
  const format = useFormatter();
  return (
    <>
      <span className="flex items-center gap-1">
        <Calendar className="w-3 h-3"/>
        {format.dateTime(new Date(album.createdAt), {month: 'short', year: 'numeric'})}
      </span>
      <span className="flex items-center gap-1">
        <ImageIcon className="w-3 h-3"/>
        {t('photoCount', {count: album.photoCount})}
      </span>
    </>
  );
};

// --- ALBUM GRID ---
interface AlbumCollectionProps {
  albums: Album[];
  onOpenAlbum: (album: Album) => void;
  // Menu thao tác đặt cạnh nút mở album (không lồng button trong button)
  renderActions?: (album: Album, variant: 'plain' | 'onImage') => React.ReactNode;
}

export const AlbumGrid: React.FC<AlbumCollectionProps> = ({albums, onOpenAlbum, renderActions}) => {
  const t = useTranslations('App.User.myAlbums');
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {albums.map((album) => (
        <li key={album.id} className="relative">
          {renderActions && (
            <div className="absolute top-3 right-3 z-10">{renderActions(album, 'onImage')}</div>
          )}
          <button
            type="button"
            onClick={() => onOpenAlbum(album)}
            aria-label={`${t('openAlbum')}: ${album.title}`}
            className="group w-full h-full text-left bg-white dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {/* Cover */}
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
              <AlbumCover
                album={album}
                className="w-full h-full"
              />
              <PrivacyLabel
                privacy={album.privacy}
                variant="onImage"
                className="absolute top-3 left-3 z-10 backdrop-blur-md text-xs font-semibold px-2 py-1 rounded-md"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 backdrop-blur-none opacity-0 group-hover:backdrop-blur-[3px] group-focus-visible:backdrop-blur-[3px] group-hover:opacity-100 group-focus-visible:opacity-100 transition-[opacity,backdrop-filter] duration-300 ease-in-out flex items-center justify-center">
                <span className="bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 px-4 py-2 rounded-lg font-medium shadow-lg">
                  {t('openAlbum')}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 line-clamp-1 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                {album.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-stone-500 dark:text-stone-400">
                <AlbumMeta album={album}/>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

// --- ALBUM LIST ---
export const AlbumList: React.FC<AlbumCollectionProps> = ({albums, onOpenAlbum, renderActions}) => {
  const t = useTranslations('App.User.myAlbums');
  return (
    <ul className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">
      {albums.map((album) => (
        <li key={album.id} className="flex items-center pr-2 sm:pr-3 first:rounded-t-xl last:rounded-b-xl hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
          <button
            type="button"
            onClick={() => onOpenAlbum(album)}
            aria-label={`${t('openAlbum')}: ${album.title}`}
            className="group flex-1 min-w-0 flex items-center gap-4 p-3 sm:px-4 text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
          >
            <div className="w-20 aspect-[4/3] shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800">
              <AlbumCover album={album} compact className="w-full h-full"/>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                {album.title}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
                <AlbumMeta album={album}/>
              </div>
            </div>
            <span
              aria-hidden
              className="hidden sm:inline-flex shrink-0 text-xs font-medium px-2.5 py-1 rounded-md border border-amber-400 text-amber-700 dark:text-amber-400 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
            >
              {t('openAlbum')}
            </span>
            <PrivacyLabel
              privacy={album.privacy}
              variant="plain"
              className="hidden sm:inline-flex shrink-0 text-xs font-medium px-2 py-1 rounded-md"
            />
          </button>
          {renderActions?.(album, 'plain')}
        </li>
      ))}
    </ul>
  );
};

// --- LOADING ---
export const AlbumGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6" aria-hidden>
    {Array.from({length: 6}).map((_, i) => (
      <div key={i} className="bg-white dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
        <div className="aspect-[4/3] bg-stone-100 dark:bg-stone-800 animate-pulse"/>
        <div className="p-4 space-y-3">
          <div className="h-5 w-2/3 rounded bg-stone-100 dark:bg-stone-800 animate-pulse"/>
          <div className="h-4 w-full rounded bg-stone-100 dark:bg-stone-800 animate-pulse"/>
        </div>
      </div>
    ))}
  </div>
);

// --- NO RESULTS ---
export const NoResults = ({query, onReset}: { query: string, onReset: () => void }) => {
  const t = useTranslations('App.User.myAlbums.noResults');
  return (
    <div className="py-16 flex flex-col items-center gap-3 text-center">
      <p className="text-stone-500 dark:text-stone-400">
        {query ? t('query', {query}) : t('filter')}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
      >
        {t('reset')}
      </button>
    </div>
  );
};

// --- LOAD ERROR ---
export const LoadError = ({onRetry}: { onRetry: () => void }) => {
  const t = useTranslations('App.User.myAlbums.error');
  return (
    <div className="w-full min-h-[320px] rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6"/>
      </div>
      <h3 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-1">{t('title')}</h3>
      <p className="text-stone-500 dark:text-stone-400 mb-6">{t('description')}</p>
      <button
        type="button"
        onClick={onRetry}
        className="px-5 py-2.5 rounded-lg border-2 border-amber-400 text-amber-600 dark:text-amber-400 font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
      >
        {t('retry')}
      </button>
    </div>
  );
};
