import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PermissionResourceState {
  resourceId: string | null;
  type: 'album' | 'photo' | 'video' | null;
  token: string | null;
  exp: number | null;
}

const initialState: PermissionResourceState = {
  resourceId: null,
  type: null,
  token: null,
  exp: null,
};

const permissionResourceSlice = createSlice({
  name: 'permissionResource',
  initialState,
  reducers: {
    setPermissionResource: (
      state,
      action: PayloadAction<PermissionResourceState>
    ) => {
      state.resourceId = action.payload.resourceId;
      state.type = action.payload.type;
      state.token = action.payload.token;
      state.exp = action.payload.exp;
    },
    clearPermissionResource: (state) => {
      state.resourceId = null;
      state.type = null;
      state.token = null;
      state.exp = null;
    },
  },
})

export const {setPermissionResource, clearPermissionResource} = permissionResourceSlice.actions;

export default permissionResourceSlice.reducer;