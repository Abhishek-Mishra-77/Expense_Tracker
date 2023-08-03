import React, { useState } from 'react';
import './ProfileComplete.css';

const ProfileComplete = () => {

    const [userName, setUserName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const Token = localStorage.getItem('token')
        console.log(Token)
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC5JaP5-gXm2_5it7T_EJeMuVqBymRSeXU', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: Token,
                    displayName: userName,
                    photoUrl: photoUrl,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'applications/json'
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data)
            }
            else {
                const data = await response.json();
                let erroMessage = 'Authentication fails!'
                if (data && data.error && data.error.message) {
                    erroMessage = data.error.message;
                }
                throw new Error(erroMessage);
            }

        }
        catch (error) {
            alert(error.message)
            console.log(error)
        }


    };

    return (
        <div>
            <nav className="navbar bg-body-tertiary mt-1">
                <div className="container-fluid">
                    <h5 className='heading'> Winners never quite , Quitters never win.</h5>
                    <span className="badge text-bg-secondary">Your profile is 64% completed. A complete Profile has <br />
                        higher changes of landing a job .
                        <a to={'/ProfileComplete'} className='anchor' href='#'>Complete now</a>
                    </span>
                </div>
            </nav >
            <hr />

            <div className='mainProfile mt-5'>
                <form className="row align-items-center profile-form" onSubmit={onSubmitHandler}>
                    <div className="row g-3">
                        <h3>Contact Details</h3>
                        <div className="col">
                            <ion-icon name="logo-github"></ion-icon>
                            <label className='profile1'>Full Name</label>
                            <input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                className='profileName m-3'
                                aria-label="First name" />
                        </div>
                        <div className="col">
                            <ion-icon name="globe-outline"></ion-icon>
                            <label className='profile1'>Profile Photo URL</label>
                            <input
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                type="text"
                                className='profilePhoto mt-3'
                                aria-label="Last name" />
                        </div>

                    </div>
                    <div className="col-auto mt-4">
                        <button type="submit" className="btn btn-warning">Update</button>
                        {/* <button style={{ marginLeft: '2rem' }} type="button" className="btn btn-danger">Cancel</button> */}
                    </div>
                </form>
                <div>
                </div>
            </div>
        </div>
    )
}

export default ProfileComplete