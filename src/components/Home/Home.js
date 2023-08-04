import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {

    const navigate = useNavigate();

    const verifyEmailHandler = async () => {
        const idToken = localStorage.getItem('token')
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC5JaP5-gXm2_5it7T_EJeMuVqBymRSeXU', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applications/json'
                },
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: idToken
                })
            })
            if (response.ok) {
                const data = await response.json();
                alert('Check Your Email And verify the email!')
                console.log(data);
            }
            else {
                const data = await response.json();
                let erroMessage = 'verifying fails!';
                if (data && data.error && data.error.message) {
                    erroMessage = data.error.message;
                }
                throw new Error(erroMessage);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }


    const logOutHandler = () => {
        alert('Are you sure your want to logOut?')
        localStorage.removeItem('token');
        navigate('/')
    }



    return (
        <>
            <nav className="navbar bg-body-tertiary mt-3">
                <div className="container-fluid">
                    <h3 className='heading'> Welcome to Expense Tracker!</h3>
                    <span className="badge text-bg-secondary">Your profile is incomplete.
                        <Link to={'/ProfileComplete'} className='anchor' href='#'>Complete now</Link>
                        <button onClick={verifyEmailHandler} style={{ marginLeft: '2rem' }} type="submit" className="btn btn-success">verify Email</button>
                        <button onClick={logOutHandler} style={{ marginLeft: '2rem' }} type="submit" className="btn btn-danger">LogOut</button>
                    </span>

                </div>
            </nav >
            <hr />
        </>
    )
}

export default Home