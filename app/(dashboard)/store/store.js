import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice";
import contactReducer from "./contactSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    contacts: contactReducer,
  },
});