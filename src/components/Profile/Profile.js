import React, { Fragment } from 'react'
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom'

const Profile = () => {


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

    return (
        <Fragment>
            <NavBar />
            <div className='aboutPage'>
                <div className='innerAbout'>
                    <div className="card text-bg-success mb-3 aboutCard" style={{ width: '25rem' }}>
                        <h1 className="card-header">Profile </h1>
                        <div className="card-body">
                            <p className="card-text">Your profile is incomplete to complete your profile please click on the card!</p>
                        </div>
                        <Link to={'/user/ProfileComplete'} type="button" className="btn btn-warning">Warning</Link>
                    </div>
                    <div className="card text-bg-info mb-3 aboutCard" style={{ width: '27rem' }}>
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