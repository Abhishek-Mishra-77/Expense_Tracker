import { createSlice } from "@reduxjs/toolkit";
const intialState = { active: false, theme: false };

const themeSlice = createSlice({
    name: 'theme',
    initialState: intialState,
    reducers: {
        activePrimium(state) {
            state.active = !state.active
        },
        themeToggle(state) {
            state.theme = !state.theme
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;