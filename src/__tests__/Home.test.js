import { render , screen } from "@testing-library/react";
import Home from "../components/Home/Home";
import { BrowserRouter } from 'react-router-dom';



test('Home component testing', () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
})

test('Home heading text  testing', () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )

    const linkElement = screen.getByText('Welcome to the Home Page!');
    expect(linkElement).toBeInTheDocument();
})