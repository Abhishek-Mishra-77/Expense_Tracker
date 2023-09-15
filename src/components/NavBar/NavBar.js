import React from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { expenseActions } from '../../store/expenseReducer';

const NavBar = () => {

    const idToken = localStorage.getItem('token')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = () => {
        alert('Are you sure your want to logOut?')
        localStorage.removeItem('token');
        dispatch(expenseActions.expenseAmount())
        localStorage.removeItem('email')
        navigate('/Auth')
    }



    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-testid='NavBarId'>
            <div className="container-fluid">
                <Link
                    to={'/user/expense'}
                    style={{ color: 'green', fontWeightL: 'bold', fontSize: '45px' }}
                    className="navbar-brand "
                    htmlFor="#">expencyFi</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item" style={{ color: 'green', fontWeight: 'bold', fontSize: '20px' }}>
                            <Link to={'/user/expense'} className="nav-link" htmlFor="#">Expenses</Link>
                        </li>
                        <li className="nav-item" style={{ color: 'green', fontWeight: 'bold', fontSize: '20px' }}>
                            <Link to={'/about'} className="nav-link" htmlFor="#">About Us</Link>
                        </li>
                        <li className="nav-item" style={{ color: 'green', fontWeight: 'bold', fontSize: '20px' }}>
                            <Link to={'/user/profile'} className="nav-link" htmlFor="#">Profile</Link>
                        </li>
                        <li className="nav-item" style={{ color: 'green', fontWeight: 'bold', fontSize: '20px' }}>
                            <Link to={'/auth'} className="nav-link" htmlFor="#">Login</Link>
                        </li>
                    </ul>
                </div>
                {idToken && <a type="button" onClick={logOutHandler} className="btn btn-danger logout">Logout</a>}
            </div>
        </nav>
    )
}

export default NavBar