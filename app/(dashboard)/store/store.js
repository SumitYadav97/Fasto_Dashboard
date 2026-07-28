import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice";
import contactReducer from "./contactSlice";
import kanbanReducer from "./kanbanSlice";
import calendarReducer from "./calendarSlice";
import messageSlice from "./contactSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    contacts: contactReducer,
    kanban: kanbanReducer,
    calendar: calendarReducer,
    chat: messageSlice,
  },
});