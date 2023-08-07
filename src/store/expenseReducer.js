import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalAmount: 0 };

const expenseSlice = createSlice({
    name: 'Expense',
    initialState: initialState,
    reducers: {
        expenseAmount(state, action) {
            state.totalAmount = action.payload
        }
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;