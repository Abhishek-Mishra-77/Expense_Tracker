import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    return (
        <>
            <nav className="navbar bg-body-tertiary mt-3">
                <div className="container-fluid">
                    <h3 className='heading'> Welcome to Expense Tracker!</h3>
                    <span className="badge text-bg-secondary">Your profile is incomplete.
                        <Link to={'/ProfileComplete'} className='anchor' href='#'>Complete now</Link>
                    </span>
                </div>
            </nav >
            <hr/>
        </>
    )
}

export default Home