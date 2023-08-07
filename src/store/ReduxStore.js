import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import expenseReducer from './expenseReducer';



const store = configureStore({
    reducer: { auth: authReducer, amount: expenseReducer }
})



export default store;

