import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src='https://tse2.mm.bing.net/th?id=OIP.-BAxDoBAPrGrPwvP_4eVmQHaGQ&pid=Api&P=0&h=180' className='logo' alt='logo' />
                <Link to={'/'}
                     style={{color:'green' , fontWeightL:'bold'}}
                     className="navbar-brand logo_name"
                    htmlFor="#">MyWebLink</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={'/home'} className="nav-link active" htmlFor="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/user/profile'} className="nav-link" htmlFor="#">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" htmlFor="#">About Us</a>
                        </li>
                        <li className="nav-item">
                            <Link to={'/auth'} className="nav-link" htmlFor="#">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar