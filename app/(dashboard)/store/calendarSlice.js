import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectDetails: [
    { id: 1, title: 'App Design', subtitle: 'Design System', date: 'Sep 3', avatars: 3, iconBg: 'bg-success', hasStar: true },
    { id: 2, title: 'Dashboard', subtitle: 'Development', date: 'Sep 4', avatars: 2, iconBg: 'bg-warning', hasStar: false },
    { id: 3, title: 'UI Kit Customization', subtitle: 'Fine Tuning', date: 'Sep 6', avatars: 4, iconBg: 'bg-primary', hasStar: true },
  ],
  tasksByDate: {
    '2020-09-03': { variant: 'success', tasks: 5 },
    '2020-09-04': { variant: 'warning', tasks: 6 },
    '2020-09-06': { variant: 'purple', tasks: 5 },
    '2020-09-26': { variant: 'today', tasks: 5 },
  }
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addAgenda: (state, action) => {
      const { dateStr, variant, taskCount } = action.payload;
      
      if (state.tasksByDate[dateStr]) {
        state.tasksByDate[dateStr].tasks += Number(taskCount);
      } else {
        state.tasksByDate[dateStr] = {
          variant: variant || 'success',
          tasks: Number(taskCount)
        };
      }
    },
    // Added reducer function to handle your "Invite People" modal state dispatch mutations
    inviteUser: (state, action) => {
      const { projectId } = action.payload;
      // Find the targeted project based on its unique id entry string/number
      const targetProject = state.projectDetails.find(
        (proj) => String(proj.id) === String(projectId)
      );
      
      // Increment the member headcount if a valid matching item array criteria is met
      if (targetProject) {
        targetProject.avatars += 1;
      }
    }
  }
});

// Export both required actions safely for use in your component views
export const { addAgenda, inviteUser } = calendarSlice.actions;
export default calendarSlice.reducer;