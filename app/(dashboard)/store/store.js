import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
  },
});