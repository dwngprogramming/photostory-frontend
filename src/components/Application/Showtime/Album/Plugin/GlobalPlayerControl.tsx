'use client';

import React, {useEffect, useRef} from 'react';
import ReactPlayer from 'react-player'
import {useAppDispatch, useAppSelector} from "@/libs/redux/hook";
import {
  clearSeekRequest,
  playerDuration,
  playerEnded,
  playerError,
  playerPaused,
  playerPlaying,
  playerProgress
} from "@/libs/redux/features/audioSlice";

// Player duy nhất của cả app, ẩn đi. Giao diện (GlassPlayer) chỉ gửi lệnh vào Redux;
// mọi sự kiện thật của player được ghi ngược lại để nút luôn đúng trạng thái.
const LOAD_TIMEOUT_MS = 20000;

const GlobalAudioPlayer = () => {
  const dispatch = useAppDispatch();
  const {currentUrl, isPlaying, volume, isMuted, mode, seekRequest, attempt} = useAppSelector((state) => state.audio);
  const isLoading = useAppSelector((state) => state.audio.isLoading);
  const playerRef = useRef<ReactPlayer>(null);
  
  // Chờ quá lâu mà player không phát thì coi là lỗi, để nút không quay mãi
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => dispatch(playerError()), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [isLoading, currentUrl, attempt, dispatch]);

  // Thực hiện yêu cầu tua rồi xoá để lần sau tua cùng vị trí vẫn chạy
  useEffect(() => {
    if (seekRequest === null) return;
    playerRef.current?.seekTo(seekRequest, 'fraction');
    dispatch(clearSeekRequest());
  }, [seekRequest, dispatch]);

  if (!currentUrl) return null;

  return (
    // Dùng hidden để ẩn player nhưng vẫn giữ nó active trong DOM
    <div className="hidden">
      <ReactPlayer
        // attempt đổi khi người dùng bấm "Thử lại": dựng lại player từ đầu
        key={attempt}
        ref={playerRef}
        url={currentUrl}
        playing={isPlaying}
        volume={volume}
        muted={isMuted}
        width="100%"
        height="100%"
        progressInterval={500}

        // Chỉ nhạc chủ đề lặp lại
        loop={mode === 'theme'}

        onPlay={() => dispatch(playerPlaying())}
        onPause={() => dispatch(playerPaused())}
        onEnded={() => dispatch(playerEnded())}
        onError={() => dispatch(playerError())}
        onDuration={(seconds) => dispatch(playerDuration(seconds))}
        onProgress={({playedSeconds}) => dispatch(playerProgress(playedSeconds))}

        attributes={{
          allow: "autoplay; encrypted-media; picture-in-picture"
        }}

        config={{
          soundcloud: {
            options: {
              auto_play: false,
              visual: false, // Audio only
            }
          }
        }}
      />
    </div>
  );
};

export default GlobalAudioPlayer;
