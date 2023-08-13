import { render, screen } from '@testing-library/react';
import ProfileComplete from '../components/ProfileCompelete/ProfileComplete'
import { BrowserRouter } from 'react-router-dom';


test('ProfileComplete component get testing', () => {


    render(
        <BrowserRouter>
            <ProfileComplete />
        </BrowserRouter>
    )
})

test('Winners never quite testing', () => {
    render(
        <BrowserRouter>
            <ProfileComplete />
        </BrowserRouter>
    )

    const linkElement = screen.getByText('Winners never quite , Quitters never win.');
    expect(linkElement).toBeInTheDocument();
})



test('Test Id text testing', () => {
    render(
        <BrowserRouter>
            <ProfileComplete />
        </BrowserRouter>
    )

    const linkElement = screen.getAllByTestId('Profilecomplete');
})

