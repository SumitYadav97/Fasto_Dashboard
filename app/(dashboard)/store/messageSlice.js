import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatHistory: [
    {
      id: 1,
      sender: "Roberto Charloz",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...",
      time: "4:30 AM",
      isMe: false,
      isImage: false,
    },
    {
      id: 2,
      sender: "Me",
      text: "sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est...",
      time: "9:30 AM",
      isMe: true,
      isImage: false,
    },
  ],
};

const messageSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },

    clearMessages: (state) => {
      state.chatHistory = [];
    },
  },
});

export const { addMessage, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;