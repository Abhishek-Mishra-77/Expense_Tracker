import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalAmount: 0, allExpenses: [] };

const expenseSlice = createSlice({
    name: 'Expense',
    initialState: initialState,
    reducers: {
        expenseAmount(state, action) {
            state.totalAmount = action.payload
        },
        allExpenses(state, action) {
            const newObj = action.payload
            const existingExpense = state.allExpenses.find((expense) => expense.id === newObj.id);
            if (!existingExpense) {
                state.allExpenses.push({
                    enteredAmount: newObj.enteredAmount,
                    enteredDescription: newObj.enteredDescription,
                    productType: newObj.productType,
                    id: newObj.id
                })
            }
            else {
                existingExpense.enteredAmount = newObj.enteredAmount
                existingExpense.enteredDescription = newObj.enteredDescription
                existingExpense.productType = newObj.productType
                existingExpense.id = newObj.id
            }
        },
        expenseRemove(state, action) {
            const id = action.payload;
            state.allExpenses = state.allExpenses.filter((expense) => expense.id !== id)
        }
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;