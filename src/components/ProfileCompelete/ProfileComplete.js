import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileComplete.css';
import NavBar from '../NavBar/NavBar';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';


const ProfileComplete = () => {

    const [userName, setUserName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const getToken = localStorage.getItem('token');
    const emailId = localStorage.getItem('email')
    const dispatch = useDispatch();


    useEffect(() => {
        if (getToken) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC5JaP5-gXm2_5it7T_EJeMuVqBymRSeXU`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'applications/json'
                        },
                        body: JSON.stringify({
                            idToken: getToken
                        })
                    })


                    if (response.ok) {
                        const data = await response.json();
                        const userData = data.users;
                        setPhotoUrl(userData[0].photoUrl);
                        setUserName(userData[0].displayName)
                        dispatch(authActions.userProfileName(userData[0].displayName))

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
            fetchData()
        }
    }, [getToken])


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC5JaP5-gXm2_5it7T_EJeMuVqBymRSeXU', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: getToken,
                    displayName: userName,
                    photoUrl: photoUrl,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'applications/json'
                }
            })
            console.log(getToken)

            console.log(response)

            if (response.ok) {
                const data = await response.json();
                alert('Profile get update!')
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
        <Fragment>
            <NavBar />
            <div className='container profilePage'>
                <div className="card  mb-4 cardprofile" style={{ color: 'white' }}>
                    <h2 className="card-header">Profile update</h2>

                    <div className="card-body">
                        <h3 className="card-title">Contact Details</h3>

                        <form className="row g-3" onSubmit={onSubmitHandler}>
                            <div className="col-md-6">
                                <ion-icon name="logo-github"></ion-icon>
                                <label className='profile1'>Full Name</label>
                                <input
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="inputEmail4" />
                            </div>
                            <div className="col-md-6">
                                <ion-icon name="globe-outline"></ion-icon>
                                <label className='profile1'>Profile Photo URL</label>
                                <input
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    type='text'
                                    className="form-control"
                                    id="inputPassword4" />
                            </div>
                            <div className="col-md-6 gap-3">
                                <label className='profile1'>Email</label>
                                <input
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    value={emailId}
                                    type='email'
                                    disabled
                                    className="form-control"
                                    id="inputPassword4" />
                            </div>
                            <div className="col-md-6">
                                <label className='profile1'>Token Id</label>
                                <input
                                    value={getToken}
                                    type='text'
                                    disabled
                                    className="form-control"
                                    id="inputPassword4" />
                            </div>
                            <div className="col-auto mt-4">
                                <button type="submit" className="btn btn-warning">Update</button>
                                <Link to={'/user/profile'} style={{ marginLeft: '2rem' }} type="button" className="btn btn-danger">Back to page</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </Fragment>
    )
}

export default ProfileComplete