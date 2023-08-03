import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <img src='https://tse2.mm.bing.net/th?id=OIP.-BAxDoBAPrGrPwvP_4eVmQHaGQ&pid=Api&P=0&h=180' className='logo' alt='logo' />
                <a className="navbar-brand logo_name" htmlFor="#">MyWebLink</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" htmlFor="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" htmlFor="#">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" htmlFor="#">About Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar