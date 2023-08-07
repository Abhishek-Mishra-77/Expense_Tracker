import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth';
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [misMatch, setMismatch] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5JaP5-gXm2_5it7T_EJeMuVqBymRSeXU', {
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
                    dispatch(authActions.emailId(data.email))
                    dispatch(authActions.tokenId(data.idToken))
                    console.log(data)

                    navigate('/user/profile')
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
                        alert('You are successfully SignUp Go for the login!');
                        console.log(data)
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
                    }, 3000)
                }
            }
        }
        catch (error) {
            console.log('Error', error);
            alert(error.message);
        }

        setConfirmPassword('')
        setPassword('');

    }


    const onLoginHandler = () => {
        setIsLogin((prev) => !prev)
    }


    return (
        <div className='loginHome'>
            <NavBar />
            <div className='container-fluid'>
                <form className='mx-auto auto1' onSubmit={onSubmitHandler}>
                    <h4 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h4>
                    {!isLogin ? <h6>{misMatch && 'Password Mismatch!'}</h6> : ''}
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
                    {isLogin && <div className='form-text mt-3' id='emailHelp'>
                        <Link to={'/password'}>Forget password?</Link>
                    </div>}
                    {!isLogin && <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"></label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder='Confirm Password'
                            className="form-control"
                            id="exampleInputPassword1"
                            required />
                    </div>}

                    <button type="submit" className="btn btn-primary mt-4">{isLogin ? 'Login' : 'Sign Up'}</button>
                    <button
                        onClick={onLoginHandler}
                        type="submit"
                        className="btn btn-info mt-4">{isLogin ? 'Don`t Have an acount? Sign Up' : 'Have an acount? Login'}</button>
                </form>
            </div>
        </div>
    )
}

export default Login