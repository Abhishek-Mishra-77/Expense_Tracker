import { render, screen } from '@testing-library/react';
import ExpenseForm from '../components/Profile/ExpenseForm';
import configStore from 'redux-mock-store';
import { Provider } from 'react-redux';


test('ExpenseForm component get testing', () => {

    const initialState = { amount: 0, active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);


    render(
        <Provider store={store}>
            <ExpenseForm />
        </Provider>
    )
})

test('ExpenseForm Document get testing', () => {

    const initialState = { amount: 0, active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);


    render(
        <Provider store={store}>
            <ExpenseForm />
        </Provider>
    )
    const linkElement = screen.getByText(/Daily Expense Budget/i);
    expect(linkElement).toBeInTheDocument();

})


test('ExpenseForm document test get testing', () => {
    const initialState = { amount: 0, active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <ExpenseForm />
        </Provider>
    )
    const linkElement = screen.getByText(/Your Budget/i);
    expect(linkElement).toBeInTheDocument();

})


test('ExpenseForm placeholder get testing', () => {
    const initialState = { amount: 0, active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <ExpenseForm />
        </Provider>
    )
    const linkElement = screen.getByPlaceholderText(/Description/i);

})

test('ExpenseForm test id get testing', () => {
    const initialState = { amount: 0, active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <ExpenseForm />
        </Provider>
    )
    const linkElement = screen.getAllByTestId(/ExpenseForm/i);

})


