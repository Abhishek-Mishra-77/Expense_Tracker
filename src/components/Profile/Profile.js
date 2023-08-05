import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import './Profile.css'


const Home = (props) => {


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
        navigate('/Auth')
    }




    return (
        <>
            <section className='mainH'>
                <div className='profile'>
                    <nav className="navbar bg-body-tertiary mt-3">
                        <div className="container-fluid">
                            <img src='https://tse2.mm.bing.net/th?id=OIP.-BAxDoBAPrGrPwvP_4eVmQHaGQ&pid=Api&P=0&h=180' className='logo1' alt='logo' />
                            <Link
                                to={'/'}
                                style={{ color: 'green', fontWeightL: 'bold', fontSize: '40px' }}
                                className="navbar-brand logo_name1"
                                htmlFor="#">MyWebLink</Link>

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

                                </ul>
                            </div>
                            <span className="badge text-bg-secondary">Your profile is incomplete.
                                <Link to={'/user/ProfileComplete'} className='anchor' href='#'>Complete now</Link>
                                <button onClick={verifyEmailHandler} style={{ marginLeft: '2rem' }} type="submit" className="btn btn-success">verify Email</button>
                                <button onClick={logOutHandler} style={{ marginLeft: '2rem' }} type="submit" className="btn btn-danger">LogOut</button>
                            </span>
                        </div>
                    </nav >
                   <ExpenseForm>
                    {props.children}
                   </ExpenseForm>
                </div>

            </section>
        </>
    )
}


export default Home