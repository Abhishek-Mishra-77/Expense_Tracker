import React, { useState } from 'react';
import './ForgetPassword.css';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (enteredEmail) {
            setIsLoading(true);
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC5JaP5-gXm2_5it7T_EJeMuVqBymRSeXU', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'applications/json'
                    },
                    body: JSON.stringify({
                        requestType: 'PASSWORD_RESET',
                        email: enteredEmail
                    })
                })

                if (response.ok) {
                    const data = await response.json();
                    alert('check your email and reset the password!');
                    setIsLoading(false);
                    navigate('/')
                }
                else {
                    const data = await response.json();
                    let erroMessage = 'Authentication fails!';
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
    }

    return (
        <div className='password'>
            <NavBar />
            <form className='form' onSubmit={onSubmitHandler}>
                <div className='control'>
                    <label htmlFor='new-password'>Enter Email</label>
                    <input
                        value={enteredEmail}
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        type='email'
                        id='new-email' />
                </div>
                <div className='action'>
                    {!isLoading && <button>Change Password</button>}
                    {isLoading && <p>Sending request....</p>}
                </div>
            </form>
        </div>
    )
}

export default ForgetPassword