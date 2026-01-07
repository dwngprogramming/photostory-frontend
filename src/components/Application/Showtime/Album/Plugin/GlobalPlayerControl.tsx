'use client';

import React from 'react';
import ReactPlayer from 'react-player'
import {useAppDispatch, useAppSelector} from "@/libs/redux/hook";
import {pauseAudio, playAudio, setAudioLoading} from "@/libs/redux/features/audioSlice";

const GlobalAudioPlayer = () => {
  const dispatch = useAppDispatch();
  const {currentUrl, isPlaying, volume, mode} = useAppSelector((state) => state.audio);
  
  // Không render gì nếu không có URL (đề phòng)
  if (!currentUrl) return null;
  
  // Chỉ Loop khi đang ở chế độ 'theme'
  const shouldLoop = mode === 'theme';
  
  return (
    // Dùng hidden để ẩn player nhưng vẫn giữ nó active trong DOM
    <div className="hidden">
      <ReactPlayer
        url={currentUrl}
        playing={isPlaying}
        volume={volume}
        width="100%"
        height="100%"
        
        loop={shouldLoop}
        
        // Callback: Khi player dừng (do user pause trên widget hoặc hết bài)
        // ta cần update ngược lại Redux store để UI đồng bộ
        
        onStart={() => dispatch(setAudioLoading(false))}
        onPause={() => dispatch(pauseAudio())}
        onPlay={() => dispatch(playAudio())}
        
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