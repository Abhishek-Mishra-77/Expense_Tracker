import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import expenseReducer from './expenseReducer';
import themeReducer from './themeReducer';



const store = configureStore({
    reducer: { auth: authReducer, amount: expenseReducer , active : themeReducer}
})



export default store;

