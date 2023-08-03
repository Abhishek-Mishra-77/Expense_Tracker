import React, { useState } from 'react';
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [misMatch, setMismatch] = useState();



    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (password === confirmPassword) {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5JaP5-gXm2_5it7T_EJeMuVqBymRSeXU', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'applications/json'
                    }
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log('User Successfully loggedIn', data);
                }
                else {
                    const data = await response.json();
                    let errroMessage = "Athentication fails!";
                    if (data && data.error && data.error.message) {
                        errroMessage = data.error.message;
                    }

                    throw new Error(errroMessage);
                }

            }
            else {
                setMismatch(true);
                setTimeout(() => {
                    setMismatch(false);
                }, 4000)
            }
        }
        catch (error) {
            console.log('Error', error);
            alert(error.message);
        }

    }


    return (
        <div className='container-fluid'>
            <form className='mx-auto' onSubmit={onSubmitHandler}>
                <h4 className='text-center'>Sign Up</h4>
                {misMatch && <h6>Password Mismatch!</h6>}
                <div className="mb-3 mt-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"></label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder='Email'
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"></label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='Password'
                        className="form-control"
                        id="exampleInputPassword2"
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"></label>
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder='Confirm Password'
                        className="form-control"
                        id="exampleInputPassword1"
                        required />
                    <div className='form-text mt-3' id='emailHelp'>Forget password?</div>
                </div>

                <button type="submit" className="btn btn-primary mt-4">Sign up</button>
                <button type="submit" className="btn btn-info mt-4">Have an acount? Login</button>
            </form>
        </div>
    )
}

export default Login