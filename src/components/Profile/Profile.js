import React, { Fragment } from 'react'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';



const Profile = () => {
    const email = localStorage.getItem('email');
    const userName = useSelector(state => state.auth.userName)

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



    return (
        <Fragment>
            <NavBar />
            <div className='container gap-4 profilePage'>
                <div className='m-4 profileInner' style={{ marginTop: '3rem' }}>
                    <div className="card text-bg-info mb-3 aboutCard" >
                        <h1 className="card-header">Email & Name</h1>
                        <div className="card-body">
                            <p className="card-text">Your Name -  {userName}</p>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Your Email  - {email}</p>
                        </div>
                    </div>
                    <div className="card text-bg-success mb-3 aboutCard" >
                        <h1 className="card-header">Profile </h1>
                        <div className="card-body">
                            <p className="card-text">Your profile is incomplete to complete your profile please click on the card!</p>
                        </div>
                        <Link to={'/user/ProfileComplete'} type="button" className="btn btn-warning">Update your profile</Link>
                    </div>
                    <div className="card text-bg-info mb-3 aboutCard" >
                        <h1 className="card-header">Email verification </h1>
                        <div className="card-body">
                            <p className="card-text">Your email verification is pending to verify email please click on card!</p>
                        </div>
                        <button onClick={verifyEmailHandler} type="button" className="btn btn-success">verify Email</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile