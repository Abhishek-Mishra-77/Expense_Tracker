import React from 'react';
import './Home.css';
import NavBar from '../NavBar/NavBar';

const Home = () => {
    return (
        <div>
            <NavBar />
            <div className='home'>
                <h2>Welcome to the Home Page!</h2>
            </div>
        </div>
    )
}

export default Home