/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
  messages: [],
  modal: {
    isOpened: false,
    type: null,
    extra: null,
  },
};

export const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getInitialData: (state, action) => {
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
    },
    newMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    changeChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
      state.currentChannelId = action.payload.id;
    },
    removeChannel: (state, action) => {
      state.currentChannelId = 1;
      state.channels = state.channels.filter((c) => c.id !== action.payload.id);
    },
    renameChannel: (state, action) => {
      state.channels.find((c) => c.id === action.payload.id).name = action.payload.name;
    },
    manipulateModal: (state, action) => {
      state.modal.isOpened = action.payload.isOpened;
      state.modal.type = action.payload.type;
      state.modal.extra = action.payload.extra;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     // eslint-disable-next-line no-use-before-define
  //     .addCase(removeChannel, (state, action) => {
  //       state.messages = state.messages.filter((m) => m.channelId !== action.payload);
  //     });
  // },
});

// Action creators are generated for each case reducer function
export const {
  getInitialData,
  newMessage,
  changeChannel,
  addChannel,
  removeChannel,
  renameChannel,
  manipulateModal,
} = chatSlice.actions;

export default chatSlice.reducer;
