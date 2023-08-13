import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar/NavBar';
import configStore from 'redux-mock-store';
import { Provider } from 'react-redux';


test('NavBar component get testing', () => {



    render(
        <NavBar />
    )
})