import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    decrementUnreadCount: (state) => {
      if (state.unreadCount > 0) state.unreadCount -= 1;
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    },
  },
});

export const { setUnreadCount, decrementUnreadCount, resetUnreadCount } = notificationSlice.actions;
export default notificationSlice.reducer;