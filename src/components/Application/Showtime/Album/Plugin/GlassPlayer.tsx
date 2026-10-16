import {AlertCircle, Loader2, Music2, Pause, Play, RotateCcw, Volume2, VolumeX} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hook";
import {
  initThemeSong,
  pauseAudio,
  playAudio,
  playStorySong,
  playThemeSong,
  requestSeek,
  retryTrack,
  toggleMute
} from "@/libs/redux/features/audioSlice";

interface GlassPlayerProps {
  musicUrl: string;
  isThemeMusic: boolean;
  // sm: thanh gọn trên đầu màn (nhạc chủ đề); md: thẻ trên trang album (nhạc của câu chuyện)
  size?: 'sm' | 'md';
}

interface SongInfo {
  title: string;
  artist: string;
}

// Mỗi bài chỉ hỏi SoundCloud một lần cho cả app
const songInfoCache = new Map<string, SongInfo>();

const useSongInfo = (musicUrl: string): SongInfo | null => {
  const [fetched, setFetched] = useState<Record<string, SongInfo>>({});
  
  useEffect(() => {
    if (!musicUrl || songInfoCache.has(musicUrl)) return;
    let cancelled = false;
    fetch(`/api/soundcloud?url=${encodeURIComponent(musicUrl)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.title) return;
        const next = {title: data.title as string, artist: (data.artist as string) ?? ''};
        songInfoCache.set(musicUrl, next);
        setFetched((prev) => ({...prev, [musicUrl]: next}));
      })
      .catch(() => {
        // Giữ nguyên: giao diện hiện tên mặc định
      });
    return () => {
      cancelled = true;
    };
  }, [musicUrl]);
  
  return songInfoCache.get(musicUrl) ?? fetched[musicUrl] ?? null;
};

const formatTime = (seconds: number) => {
  const total = Math.max(0, Math.floor(seconds));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

const Equalizer = ({active}: { active: boolean }) => (
  <span aria-hidden className="flex gap-0.5 items-end h-3 shrink-0">
    {[0, 150, 75].map((delay, i) => (
      <span
        key={i}
        style={{animationDelay: `${delay}ms`}}
        className={`w-0.5 rounded-full bg-orange-400/90 transition-[height] duration-300 ${
          active ? 'h-3 motion-safe:animate-pulse' : 'h-1'
        }`}
      />
    ))}
  </span>
);

const sliderClass = "w-full h-1 rounded-full appearance-none cursor-pointer disabled:cursor-default focus:outline-none "
  + "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full "
  + "[&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:border-0 "
  + "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500 [&::-moz-range-thumb]:border-0 "
  + "focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-amber-300 "
  + "disabled:[&::-webkit-slider-thumb]:opacity-0 disabled:[&::-moz-range-thumb]:opacity-0";

const fillStyle = (percent: number): React.CSSProperties => ({
  background: `linear-gradient(to right, #f59e0b ${percent}%, rgba(120,113,108,0.25) ${percent}%)`,
});

const GlassPlayer = ({musicUrl, isThemeMusic, size = "md"}: GlassPlayerProps) => {
  const t = useTranslations('App.Showtime.player');
  const dispatch = useAppDispatch();
  const {mode, themeUrl, currentUrl, isPlaying, isLoading, hasError, isMuted, position, duration} =
    useAppSelector(state => state.audio);
  const info = useSongInfo(musicUrl);
  const [dragValue, setDragValue] = useState<number | null>(null);

  useEffect(() => {
    if (isThemeMusic && musicUrl !== '') dispatch(initThemeSong(musicUrl));
  }, [dispatch, isThemeMusic, musicUrl]);

  const isActive = isThemeMusic
    ? mode === 'theme' && currentUrl === themeUrl
    : mode === 'story' && currentUrl === musicUrl;

  const isFailed = isActive && hasError;
  const isBuffering = isActive && isLoading && isPlaying;
  const isRunning = isActive && isPlaying && !isLoading;
  const canSeek = isActive && duration > 0 && !isFailed;

  const title = info?.title ?? t('unknownTitle');
  const artist = info?.artist || t('unknownArtist');

  const handleToggle = () => {
    if (isFailed) dispatch(retryTrack());
    else if (isActive) dispatch(isPlaying ? pauseAudio() : playAudio());
    else if (isThemeMusic) dispatch(playThemeSong());
    else dispatch(playStorySong(musicUrl));
  };

  const sliderValue = dragValue ?? (canSeek ? Math.round((position / duration) * 1000) : 0);
  const commitSeek = () => {
    if (dragValue === null) return;
    dispatch(requestSeek(dragValue / 1000));
    setDragValue(null);
  };
  const shownPosition = dragValue !== null ? (dragValue / 1000) * duration : position;

  const label = isFailed ? t('retry') : isRunning || isBuffering ? t('pause') : t('play');
  const isCompact = size === 'sm';
  const iconClass = isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4';

  const playButton = (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`${label}: ${title}`}
      className={`relative shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-stone-900 flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(249,115,22,0.4)] transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/60 ${
        isCompact ? 'w-8 h-8' : 'w-9 h-9'
      }`}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none"/>
      {isFailed ? <RotateCcw className={iconClass}/>
        : isBuffering ? <Loader2 className={`${iconClass} motion-safe:animate-spin`}/>
          : isRunning ? <Pause className={`${iconClass} fill-current`}/>
            : <Play className={`${iconClass} fill-current ml-0.5`}/>}
    </button>
  );

  const muteButton = (
    <button
      type="button"
      onClick={() => dispatch(toggleMute())}
      aria-label={isMuted ? t('unmute') : t('mute')}
      aria-pressed={isMuted}
      className="shrink-0 p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-900/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      {isMuted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
    </button>
  );

  const glass = `absolute inset-0 -z-10 backdrop-blur-xl backdrop-saturate-150 transition-all duration-700 ${
    isCompact ? 'rounded-full bg-white/70' : 'rounded-xl bg-white/65'
  } ${isRunning
    ? 'border border-orange-400/60 shadow-[inset_0_0_26px_rgba(251,146,60,0.4),inset_0_0_8px_rgba(255,255,255,0.3)]'
    : 'border border-white/60 shadow-lg'}`;

  if (isCompact) {
    const percent = canSeek ? Math.min((position / duration) * 100, 100) : 0;
    return (
      <div
        role="group"
        aria-label={isThemeMusic ? t('themeSong') : title}
        title={isThemeMusic ? t('themeSong') : undefined}
        className="relative isolate flex items-center gap-2 h-11 w-max max-w-[min(280px,calc(100vw-2rem))] pl-1.5 pr-1.5 select-none overflow-hidden rounded-full"
      >
        <span aria-hidden className={glass}/>
        {playButton}
        <div className="min-w-0 leading-tight">
          <p className="font-serif font-bold text-[13px] text-stone-800 truncate">{title}</p>
          <p className="flex items-center gap-1 text-[11px] text-stone-600 truncate">
            <Music2 aria-hidden className="w-3 h-3 shrink-0"/>
            <span className="truncate">{isFailed ? t('loadFailed') : artist}</span>
          </p>
        </div>
        <Equalizer active={isRunning}/>
        {muteButton}
        {/* Tiến độ: chỉ để nhìn, tua thì dùng thẻ trên trang */}
        <span
          aria-hidden
          className="absolute left-4 right-4 bottom-0.5 h-0.5 rounded-full"
          style={fillStyle(percent)}
        />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={title}
      className="relative isolate w-full px-2.5 py-2 select-none overflow-hidden rounded-xl"
    >
      <span aria-hidden className={glass}/>
      <div className="flex items-center gap-2.5">
        {playButton}
        <div className="min-w-0 flex-1 leading-tight">
          <p className="font-serif font-bold text-sm text-stone-800 truncate">{title}</p>
          <div className="flex items-center gap-2 text-[11px] text-stone-600">
            <span className="truncate">{artist}</span>
            <Equalizer active={isRunning}/>
          </div>
        </div>
        {muteButton}
      </div>

      <div className="mt-1 flex items-center gap-2 text-[10px] tabular-nums text-stone-600">
        <span className="w-7 text-right">{canSeek ? formatTime(shownPosition) : '–:––'}</span>
        <input
          type="range"
          min={0}
          max={1000}
          step={1}
          value={sliderValue}
          disabled={!canSeek}
          onChange={(e) => setDragValue(Number(e.target.value))}
          onPointerUp={commitSeek}
          onKeyUp={commitSeek}
          onBlur={commitSeek}
          aria-label={t('seek')}
          aria-valuetext={canSeek ? `${formatTime(shownPosition)} / ${formatTime(duration)}` : undefined}
          style={fillStyle(sliderValue / 10)}
          className={sliderClass}
        />
        <span className="w-7">{canSeek ? formatTime(duration) : '–:––'}</span>
      </div>

      {isFailed && (
        <p role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-red-700">
          <AlertCircle aria-hidden className="w-3.5 h-3.5 shrink-0"/>
          {t('loadFailed')}
        </p>
      )}
    </div>
  );
};

export default GlassPlayer;
