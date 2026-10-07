import { createSlice } from "@reduxjs/toolkit";
import { mockarooData } from "../Data/projects_data/projects_data"; 

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: mockarooData || [],
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