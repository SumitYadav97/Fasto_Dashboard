import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customContacts: [],
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.customContacts.push(action.payload);
        },
    },
});

export const { addContact } = contactSlice.actions;
export default contactSlice.reducer;