import { render, screen } from '@testing-library/react';
import Login from '../components/Authentication/Login';
import configStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';



test('Login component get testing', () => {

    const initialState = { amount: '', active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);


    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    )
})

test('Login Text  get testing', () => {

    const initialState = { amount: 0, active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);


    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    )
    const linkElement = screen.getAllByText(/Login/i);

})

test('Login form placeholder get testing', () => {
    const initialState = { amount: 0, active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    )
    const linkElement = screen.getByPlaceholderText(/Email/i);

})

test('Login test id get testing', () => {
    const initialState = { amount: 0, active: true };
    const mockStore = configStore();
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    )
    const linkElement = screen.getAllByTestId(/Loginid/i);

})
