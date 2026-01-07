import {AudioState} from "@/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initState: AudioState = {
  currentUrl: null,
  themeUrl: null,
  isPlaying: false,
  mode: "theme",
  volume: 0.5,
  isLoading: false,
}

const audioSlice = createSlice({
  name: 'audio',
  initialState: initState,
  reducers: {
    setAudioLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    initThemeSong: (state, action: PayloadAction<string>) => {
      if (state.themeUrl === null) {
        state.currentUrl = action.payload;
        state.themeUrl = action.payload;
        state.mode = "theme";
      }
    },
    playThemeSong: (state) => {
      if (state.themeUrl) {
        state.currentUrl = state.themeUrl;
        state.mode = "theme";
        state.isPlaying = true;
        state.isLoading = true;
      }
    },
    
    playStorySong: (state, action: PayloadAction<string>) => {
      state.currentUrl = action.payload;
      state.mode = "story";
      state.isPlaying = true;
      state.isLoading = true;
    },
    
    pauseAudio: (state) => {
      if (state.isPlaying) state.isPlaying = false;
    },
    
    playAudio: (state) => {
      if (state.currentUrl && !state.isPlaying) state.isPlaying = true;
    },
    
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    }
  }
})

export const {setAudioLoading, initThemeSong, playThemeSong, playStorySong, pauseAudio, playAudio, setVolume} = audioSlice.actions;
export default audioSlice.reducer;