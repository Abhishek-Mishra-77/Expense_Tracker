import { createSlice } from '@reduxjs/toolkit';

const initalState = {
    IdToken: null,
    email: null,
    userName: ''
}


const authSlice = createSlice({
    name: 'Authenitcation',
    initialState: initalState,
    reducers: {
        tokenId(state, action) {
            state.IdToken = action.payload
            localStorage.setItem('token', state.IdToken)
        },
        emailId(state, action) {
            state.email = action.payload
            localStorage.setItem('email', state.email)
        },
        userProfileName(state, action) {
            state.userName = action.payload
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;
