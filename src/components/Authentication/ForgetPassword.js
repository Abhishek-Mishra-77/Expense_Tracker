import React, { useState } from 'react';
import './ForgetPassword.css';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const onSubmitHandler = async (e) => {
        e.preventDefault();
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
                setIsLoading(false);
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




    return (
        <div className='password'>
            <NavBar />
            <div>
                <form className='form' onSubmit={onSubmitHandler}>
                    {isLoading && <p className='text-center'>Sending request....</p>}
                    <div className='control'>
                        <label htmlFor='new-password'>Enter Name</label>
                        <input
                            value={enteredName}
                            onChange={(e) => setEnteredName(e.target.value)}
                            type='text'
                            className='mb-4'
                            placeholder='enter your name'
                            id='new-email'
                            required />
                        <label htmlFor='new-password'>Enter Email</label>
                        <input
                            value={enteredEmail}
                            onChange={(e) => setEnteredEmail(e.target.value)}
                            type='email'
                            className='mb-4'
                            placeholder='enter your email'
                            id='new-email'
                            required />
                    </div>
                    <div className='action'>
                         <button >Change Password</button>
                        <Link to={'/Auth'}><button style={{ marginLeft: '2rem' }} type="submit" className="btn btn-danger">Back to login</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword