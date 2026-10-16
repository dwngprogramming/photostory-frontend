"use client";

import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Check, Copy, ExternalLink, Eye, Globe, KeyRound, Lock, MoreVertical, Share2, Trash2, X} from "lucide-react";
import {useTranslations} from "next-intl";
import {toast} from "sonner";
import ModalWrapper from "@/components/Common/ModalWrapper";
import {Link, useRouter} from "@/libs/i18n/navigation";
import {Album} from "@/types";

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// --- ACTION MENU ---
interface AlbumActionsMenuProps {
  album: Album;
  onShare: () => void;
  onTogglePrivacy: () => void;
  onDelete: () => void;
  // onImage: nút nằm trên ảnh bìa, nền tối mờ
  variant?: 'plain' | 'onImage';
  className?: string;
}

export const AlbumActionsMenu = ({album, onShare, onTogglePrivacy, onDelete, variant = 'plain', className = ''}: AlbumActionsMenuProps) => {
  const t = useTranslations('App.User.myAlbums.actions');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleCopyCode = async () => {
    if (!album.shareCode) return;
    if (await copyText(album.shareCode)) toast.success(t('codeCopied'));
    else toast.error(t('copyFailed'));
  };

  const items = [
    {key: 'preview', icon: Eye, label: t('preview'), onSelect: () => router.push(`/preview/${album.id}`)},
    {key: 'share', icon: Share2, label: t('share'), onSelect: onShare},
    ...(album.shareCode ? [{key: 'copy', icon: Copy, label: t('copyCode'), onSelect: handleCopyCode}] : []),
    {
      key: 'privacy',
      icon: album.privacy === 'public' ? Lock : Globe,
      label: album.privacy === 'public' ? t('makePrivate') : t('makePublic'),
      onSelect: onTogglePrivacy,
    },
    {key: 'delete', icon: Trash2, label: t('delete'), onSelect: onDelete, danger: true},
  ];

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t('menu', {title: album.title})}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 ${variant === 'onImage'
          ? 'bg-black/40 backdrop-blur-md text-white hover:bg-black/60 focus-visible:ring-white/80'
          : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 focus-visible:ring-amber-400'}`}
      >
        <MoreVertical className="w-4 h-4"/>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{opacity: 0, y: -6, scale: 0.97}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -6, scale: 0.97}}
            transition={{duration: 0.15, ease: "easeOut"}}
            className={`absolute ${variant === 'onImage' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} mt-1 w-52 rounded-xl bg-white dark:bg-stone-800 shadow-lg ring-1 ring-stone-200 dark:ring-stone-700 overflow-hidden z-20 py-1`}
          >
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  item.onSelect();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors focus:outline-none focus-visible:bg-stone-100 dark:focus-visible:bg-stone-700 ${
                  item.danger
                    ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0"/>
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SHARE DIALOG ---
const dialogMotion = {
  initial: {opacity: 0, scale: 0.95, y: 20},
  animate: {opacity: 1, scale: 1, y: 0},
  exit: {opacity: 0, scale: 0.95, y: 20},
  transition: {type: "spring" as const, duration: 0.5},
};

const dialogClass = "relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden";

const CloseButton = ({onClick, label}: { onClick: () => void, label: string }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
  >
    <X className="w-5 h-5"/>
  </button>
);

const PreviewLink = ({albumId}: { albumId: string }) => {
  const t = useTranslations('App.User.myAlbums.share');
  return (
    <Link
      href={`/preview/${albumId}`}
      className="w-full h-12 rounded-xl border-2 border-amber-400 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-semibold flex items-center justify-center gap-2 transition-colors"
    >
      <Eye className="w-4 h-4"/>
      {t('preview')}
    </Link>
  );
};

interface ShareAlbumModalProps {
  album: Album | null;
  onClose: () => void;
}

export const ShareAlbumModal = ({album, onClose}: ShareAlbumModalProps) => {
  const t = useTranslations('App.User.myAlbums.share');
  const tCommon = useTranslations('Common');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!album?.shareCode) return;
    if (await copyText(album.shareCode)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error(t('copyFailed'));
    }
  };

  return (
    <ModalWrapper isOpen={!!album} onClose={onClose} ariaLabel={t('title')}>
      {album && (
        <motion.div {...dialogMotion} className={dialogClass}>
          <CloseButton onClick={onClose} label={tCommon('close')}/>

          <div className="p-6 pb-0 text-center">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-6 h-6"/>
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">{t('title')}</h3>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 line-clamp-2">{album.title}</p>
          </div>

          {album.shareCode ? (
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t('codeLabel')}</p>
                <div className="flex gap-2">
                  <code className="flex-1 min-w-0 h-12 px-4 flex items-center rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-sm sm:text-base tracking-wide text-stone-900 dark:text-stone-100 truncate select-all">
                    {album.shareCode}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="h-12 px-4 shrink-0 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold flex items-center gap-2 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                    {copied ? t('copied') : t('copy')}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-sm">
                {album.hasPin
                  ? <KeyRound className="w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"/>
                  : <Globe className="w-4 h-4 mt-0.5 shrink-0 text-stone-500 dark:text-stone-400"/>}
                <p className="text-stone-600 dark:text-stone-300">
                  {album.hasPin ? t('withPin') : t('withoutPin')}
                </p>
              </div>

              <p className="text-sm text-stone-500 dark:text-stone-400">{t('howTo')}</p>

              <PreviewLink albumId={album.id}/>

              <Link
                href="/demo/unwrap"
                target="_blank"
                className="w-full h-12 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4"/>
                {t('openUnwrap')}
              </Link>
            </div>
          ) : (
            <div className="p-6 space-y-4 text-center">
              <p className="text-sm text-stone-600 dark:text-stone-300">{t('notShared')}</p>
              <button
                type="button"
                onClick={() => toast.info(t('createComingSoon'))}
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold transition-colors"
              >
                {t('createCode')}
              </button>
              <PreviewLink albumId={album.id}/>
            </div>
          )}
        </motion.div>
      )}
    </ModalWrapper>
  );
};

// --- DELETE DIALOG ---
interface DeleteAlbumModalProps {
  album: Album | null;
  onClose: () => void;
  onConfirm: (album: Album) => void;
}

export const DeleteAlbumModal = ({album, onClose, onConfirm}: DeleteAlbumModalProps) => {
  const t = useTranslations('App.User.myAlbums.delete');
  const tCommon = useTranslations('Common');

  return (
    <ModalWrapper isOpen={!!album} onClose={onClose} ariaLabel={t('title')} closeOnBackdrop={false}>
      {album && (
        <motion.div {...dialogMotion} className={dialogClass}>
          <CloseButton onClick={onClose} label={tCommon('close')}/>
          <div className="p-6 pb-0 text-center">
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6"/>
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">{t('title')}</h3>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              {t.rich('description', {
                title: album.title,
                b: (chunks) => <span className="font-semibold text-stone-800 dark:text-stone-100">{chunks}</span>,
              })}
            </p>
            {album.shareCode && (
              <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{t('codeWarning')}</p>
            )}
          </div>
          <div className="p-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onConfirm(album)}
              className="w-full h-12 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold rounded-xl transition-colors"
            >
              {t('confirm')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-medium rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
            >
              {t('cancel')}
            </button>
          </div>
        </motion.div>
      )}
    </ModalWrapper>
  );
};
