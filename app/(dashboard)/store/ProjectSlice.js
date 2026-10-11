
import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",

  initialState: {
    list: [],
  },

  reducers: {
    setProjects: (state, action) => {
      state.list = action.payload;
    },

    addProject: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
});

export const { setProjects, addProject } = projectSlice.actions;

export default projectSlice.reducer;
