import { createSlice } from "@reduxjs/toolkit";
import { mockarooData } from "../Data/projects_data/page"; // Your initial mock data

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: mockarooData,
  },
  reducers: {
    addProject: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
});

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;