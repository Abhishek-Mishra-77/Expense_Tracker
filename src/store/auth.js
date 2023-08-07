import { createSlice } from '@reduxjs/toolkit';

const initalState = {
    IdToken: null,
    email: null
}


const authSlice = createSlice({
    name: 'Authenitcation',
    initialState: initalState,
    reducers: {
        tokenId(state, action) {
            state.IdToken = action.payload
            localStorage.setItem('token', JSON.stringify(state.IdToken))
        },
        emailId(state, action) {
            state.email = action.payload
            localStorage.setItem('email', JSON.stringify(state.email))
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;
