import {Calendar, FolderPlus, Globe, Image, Lock, MoreVertical, Plus} from "lucide-react";
import {Album} from "@/types";
import React from "react";
import {useDropzone} from "react-dropzone";
import {useTranslations} from "next-intl";

// --- STORAGE COMPONENT ---

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
      <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-2">
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

// --- ALBUM GRID ---
interface AlbumGridProps {
  albums: Album[];
  onOpenAlbum: (album: Album) => void;
}

export const AlbumGrid: React.FC<AlbumGridProps> = ({ albums, onOpenAlbum }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {albums.map((album) => (
        <div
          key={album.id}
          onClick={() => onOpenAlbum(album)}
          className="group bg-white dark:bg-stone-900 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          {/* Cover */}
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
            <img
              src={album.coverImage}
              alt={album.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              {album.privacy === 'private' ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
              <span className="capitalize">{album.privacy}</span>
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 px-4 py-2 rounded-lg font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Open Album
              </button>
            </div>
          </div>
          
          {/* Details */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                {album.title}
              </h3>
              <button className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between text-sm text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {album.date}
              </span>
              <span className="flex items-center gap-1">
                <Image className="w-3 h-3" />
                {album.photoCount} photos
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};