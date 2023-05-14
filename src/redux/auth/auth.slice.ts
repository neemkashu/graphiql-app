import { initialState } from '@/redux/auth/auth.const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<boolean>): void {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
