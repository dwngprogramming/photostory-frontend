"use client";

import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Check, Copy, ExternalLink, Eye, Globe, KeyRound, MoreVertical, Share2, Trash2, Users, X} from "lucide-react";
import {useTranslations} from "next-intl";
import {toast} from "sonner";
import ModalWrapper from "@/components/Common/ModalWrapper";
import {Link, useRouter} from "@/libs/i18n/navigation";
import {Album, AlbumPrivacy} from "@/types";

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// Link mời không kèm locale để người nhận mở theo ngôn ngữ của họ
const inviteLink = (shareLinkId: string) => `${window.location.origin}/share/${shareLinkId}`;

// --- ACTION MENU ---
const PRIVACY_OPTIONS = [
  {value: 'PUBLIC', icon: Globe},
  {value: 'PIN_PROTECTED', icon: KeyRound},
  {value: 'INVITE_ONLY', icon: Users},
] as const;

interface AlbumActionsMenuProps {
  album: Album;
  onShare: () => void;
  onChangePrivacy: (privacy: AlbumPrivacy) => void;
  onDelete: () => void;
  // onImage: nút nằm trên ảnh bìa, nền tối mờ
  variant?: 'plain' | 'onImage';
  className?: string;
}

export const AlbumActionsMenu = ({album, onShare, onChangePrivacy, onDelete, variant = 'plain', className = ''}: AlbumActionsMenuProps) => {
  const t = useTranslations('App.User.myAlbums.actions');
  const tPrivacy = useTranslations('App.User.myAlbums.privacy');
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

  const copyItem = album.privacy === 'INVITE_ONLY'
    ? album.shareLinkId && {label: t('copyLink'), text: inviteLink(album.shareLinkId), done: t('linkCopied')}
    : album.shareCode && {label: t('copyCode'), text: album.shareCode, done: t('codeCopied')};

  const handleCopy = async () => {
    if (!copyItem) return;
    if (await copyText(copyItem.text)) toast.success(copyItem.done);
    else toast.error(t('copyFailed'));
  };

  const items = [
    {key: 'preview', icon: Eye, label: t('preview'), onSelect: () => router.push(`/preview/${album.id}`)},
    {key: 'share', icon: Share2, label: t('share'), onSelect: onShare},
    ...(copyItem ? [{key: 'copy', icon: Copy, label: copyItem.label, onSelect: handleCopy}] : []),
  ];

  const close = () => setIsOpen(false);
  const itemClass = 'w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors focus:outline-none focus-visible:bg-stone-100 dark:focus-visible:bg-stone-700';

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
            className={`absolute right-0 origin-top-right mt-1 w-72 max-w-[calc(100vw-2rem)] rounded-xl bg-white dark:bg-stone-800 shadow-lg ring-1 ring-stone-200 dark:ring-stone-700 overflow-hidden z-20 py-1`}
          >
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  item.onSelect();
                }}
                className={`${itemClass} text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700`}
              >
                <item.icon className="w-4 h-4 shrink-0"/>
                {item.label}
              </button>
            ))}

            {/* Chọn quyền trực tiếp, đánh dấu quyền đang áp dụng */}
            <div role="group" aria-labelledby={`access-${album.id}`} className="border-t border-stone-100 dark:border-stone-700 mt-1 pt-1">
              <p id={`access-${album.id}`} className="px-4 pt-2 pb-1 text-xs font-medium text-stone-400 dark:text-stone-500">
                {t('accessLabel')}
              </p>
              {PRIVACY_OPTIONS.map((option) => {
                const isCurrent = option.value === album.privacy;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isCurrent}
                    onClick={() => {
                      close();
                      if (!isCurrent) onChangePrivacy(option.value);
                    }}
                    className={`${itemClass} items-start text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700`}
                  >
                    <option.icon className="w-4 h-4 mt-0.5 shrink-0"/>
                    <span className="flex-1 min-w-0">
                      <span className={`block ${isCurrent ? 'font-semibold text-stone-900 dark:text-stone-100' : ''}`}>
                        {tPrivacy(option.value)}
                      </span>
                      <span className="block text-xs text-stone-500 dark:text-stone-400">{tPrivacy(`hint.${option.value}`)}</span>
                    </span>
                    {isCurrent && <Check className="w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"/>}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-stone-100 dark:border-stone-700 mt-1 pt-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  close();
                  onDelete();
                }}
                className={`${itemClass} text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40`}
              >
                <Trash2 className="w-4 h-4 shrink-0"/>
                {t('delete')}
              </button>
            </div>
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

const SHARE_NOTES = {
  PUBLIC: {icon: Globe, tone: 'text-emerald-600 dark:text-emerald-400'},
  PIN_PROTECTED: {icon: KeyRound, tone: 'text-amber-600 dark:text-amber-400'},
  INVITE_ONLY: {icon: Users, tone: 'text-sky-600 dark:text-sky-400'},
} as const;

interface ShareAlbumModalProps {
  album: Album | null;
  onClose: () => void;
}

export const ShareAlbumModal = ({album, onClose}: ShareAlbumModalProps) => {
  const t = useTranslations('App.User.myAlbums.share');
  const tCommon = useTranslations('Common');
  const [copied, setCopied] = useState(false);

  // INVITE_ONLY chia sẻ bằng link mời, hai quyền còn lại bằng mã unwrap
  const isInvite = album?.privacy === 'INVITE_ONLY';
  const shareValue = isInvite
    ? album?.shareLinkId && inviteLink(album.shareLinkId)
    : album?.shareCode;
  const NoteIcon = album ? SHARE_NOTES[album.privacy].icon : Globe;

  const handleCopy = async () => {
    if (!shareValue) return;
    if (await copyText(shareValue)) {
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

          {shareValue ? (
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t(isInvite ? 'linkLabel' : 'codeLabel')}</p>
                <div className="flex gap-2">
                  <code className={`flex-1 min-w-0 h-12 px-4 flex items-center rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-stone-900 dark:text-stone-100 truncate select-all ${isInvite ? 'text-xs sm:text-sm' : 'text-sm sm:text-base tracking-wide'}`}>
                    {shareValue}
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
                <NoteIcon className={`w-4 h-4 mt-0.5 shrink-0 ${SHARE_NOTES[album.privacy].tone}`}/>
                <p className="text-stone-600 dark:text-stone-300">{t(`note.${album.privacy}`)}</p>
              </div>

              <p className="text-sm text-stone-500 dark:text-stone-400">{t(isInvite ? 'howToInvite' : 'howTo')}</p>

              <PreviewLink albumId={album.id}/>

              {!isInvite && (
                <Link
                  href="/demo/unwrap"
                  target="_blank"
                  className="w-full h-12 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4"/>
                  {t('openUnwrap')}
                </Link>
              )}
            </div>
          ) : (
            <div className="p-6 space-y-4 text-center">
              <p className="text-sm text-stone-600 dark:text-stone-300">{t(isInvite ? 'noLink' : 'notShared')}</p>
              <button
                type="button"
                onClick={() => toast.info(t('createComingSoon'))}
                className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold transition-colors"
              >
                {t(isInvite ? 'createLink' : 'createCode')}
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
            {(album.shareCode || album.shareLinkId) && (
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
