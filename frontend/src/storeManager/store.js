/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-named-as-default
import chatSlice from './chatSlice';

console.log(chatSlice);
export const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
});
