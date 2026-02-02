import {configureStore} from "@reduxjs/toolkit";
import audioReducer from "@/libs/redux/features/audioSlice";
import permissionResourceReducer from "@/libs/redux/features/permissionResourceSlice";

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    permissionResource: permissionResourceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;