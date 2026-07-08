import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice";
import contactReducer from "./contactSlice";
import kanbanReducer from "./kanbanSlice";
export const store = configureStore({
  reducer: {
    projects: projectReducer,
    contacts: contactReducer,
    kanban: kanbanReducer,
  },
});