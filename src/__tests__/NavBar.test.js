import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar/NavBar'
import { BrowserRouter } from 'react-router-dom';



test('NavBar component get testing', () => {


    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>

    )
})

test('MyWebLink in NavBar', () => {
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )

    const linkElement = screen.getByText('MyWebLink');
    expect(linkElement).toBeInTheDocument();
})



test('Test Id text in NavBar testing', () => {
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )

    const linkElement = screen.getAllByTestId('NavBarId');
})

