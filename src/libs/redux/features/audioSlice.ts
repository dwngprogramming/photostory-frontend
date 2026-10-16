import {AudioAlbumMode, AudioState} from "@/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initState: AudioState = {
  currentUrl: null,
  themeUrl: null,
  mode: "theme",
  isPlaying: false,
  isLoading: false,
  hasError: false,
  volume: 0.5,
  isMuted: false,
  position: 0,
  duration: 0,
  seekRequest: null,
  attempt: 0,
  isThemeSongPlayed: false,
}

// Bắt đầu phát một bài. Chỉ đánh dấu "đang tải" khi thật sự đổi bài hoặc đang lỗi,
// vì player chỉ báo "đã phát" khi bắt đầu một bài mới; đánh dấu thừa sẽ làm nút quay mãi.
const startTrack = (state: AudioState, url: string, mode: AudioAlbumMode) => {
  const isNewTrack = state.currentUrl !== url;
  if (isNewTrack) {
    state.currentUrl = url;
    state.position = 0;
    state.duration = 0;
    state.seekRequest = null;
  }
  if (isNewTrack || state.hasError) state.isLoading = true;
  state.mode = mode;
  state.isPlaying = true;
  state.hasError = false;
};

const audioSlice = createSlice({
  name: 'audio',
  initialState: initState,
  reducers: {
    // --- Lệnh từ giao diện ---
    initThemeSong: (state, action: PayloadAction<string>) => {
      if (state.themeUrl === null) {
        state.themeUrl = action.payload;
        if (!state.currentUrl) state.currentUrl = action.payload;
      }
    },

    // Tự phát nhạc chủ đề lần đầu người đọc chạm vào sách (trình duyệt cần thao tác người dùng).
    // Chỉ chạy một lần: sau đó người đọc tự quyết định phát hay dừng.
    autoStartThemeSong: (state) => {
      if (!state.themeUrl || state.isThemeSongPlayed || state.isPlaying) return;
      state.isThemeSongPlayed = true;
      startTrack(state, state.themeUrl, "theme");
    },

    playThemeSong: (state) => {
      if (!state.themeUrl) return;
      state.isThemeSongPlayed = true;
      startTrack(state, state.themeUrl, "theme");
    },

    playStorySong: (state, action: PayloadAction<string>) => {
      startTrack(state, action.payload, "story");
    },

    pauseAudio: (state) => {
      state.isPlaying = false;
      state.isLoading = false;
    },

    playAudio: (state) => {
      if (!state.currentUrl || state.isPlaying) return;
      state.isPlaying = true;
      state.hasError = false;
      // Chưa từng phát bài này thì player cần thời gian khởi động
      if (state.position === 0 && state.duration === 0) state.isLoading = true;
    },

    retryTrack: (state) => {
      if (!state.currentUrl) return;
      state.attempt += 1;
      state.hasError = false;
      state.isLoading = true;
      state.isPlaying = true;
      state.position = 0;
      state.duration = 0;
    },

    requestSeek: (state, action: PayloadAction<number>) => {
      state.seekRequest = Math.min(Math.max(action.payload, 0), 1);
      if (state.duration > 0) state.position = state.seekRequest * state.duration;
    },

    clearSeekRequest: (state) => {
      state.seekRequest = null;
    },

    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = Math.min(Math.max(action.payload, 0), 1);
      state.isMuted = state.volume === 0;
    },

    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
      // Bật tiếng khi âm lượng đang 0 thì trả về mức mặc định
      if (!state.isMuted && state.volume === 0) state.volume = 0.5;
    },

    // Rời khỏi album: dừng nhạc và quên bài chủ đề của album này
    resetAudio: () => initState,

    // --- Sự kiện từ player thật ---
    playerPlaying: (state) => {
      state.isPlaying = true;
      state.isLoading = false;
      state.hasError = false;
    },

    playerPaused: (state) => {
      // Khi đổi bài, player báo pause của bài cũ; bỏ qua để không tắt bài mới
      if (state.isLoading) return;
      state.isPlaying = false;
    },

    playerEnded: (state) => {
      state.isPlaying = false;
      state.isLoading = false;
      state.position = 0;
    },

    playerError: (state) => {
      state.isPlaying = false;
      state.isLoading = false;
      state.hasError = true;
    },

    playerDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },

    playerProgress: (state, action: PayloadAction<number>) => {
      // Đang tải bài mới: tiến độ nhận được còn là của bài cũ
      if (state.isLoading) return;
      state.position = action.payload;
    },
  }
})

export const {
  initThemeSong, autoStartThemeSong, playThemeSong, playStorySong, pauseAudio, playAudio, retryTrack,
  requestSeek, clearSeekRequest, setVolume, toggleMute, resetAudio,
  playerPlaying, playerPaused, playerEnded, playerError, playerDuration, playerProgress,
} = audioSlice.actions;
export default audioSlice.reducer;
