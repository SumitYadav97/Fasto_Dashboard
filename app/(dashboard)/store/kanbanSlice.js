import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    boards: [],
};
const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        addBoard: (state, action) => {
            state.boards.push(action.payload);
        },
        setBoards: (state, action) => {
            state.boards = action.payload;
        },
        removeBoard: (state, action) => {
            state.boards = state.boards.filter(
                (board) => board.id !== action.payload
            );
        },
    },
});
export const { addBoard, setBoards, removeBoard } = kanbanSlice.actions;
export default kanbanSlice.reducer;