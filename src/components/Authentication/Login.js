import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth';
import HashLoader from "react-spinners/HashLoader";
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [misMatch, setMismatch] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000)
    }, [])





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

                    navigate('/user/expense')
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
                        dispatch(authActions.emailId(data.email))
                        dispatch(authActions.tokenId(data.idToken))
                        navigate('/user/expense')
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
        <div>
            <NavBar />
            <div className='container loginPage'>
                {loading ? <HashLoader
                    color={"#36d7b7"}
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> :
                    <div className="card text-bg-light mb-4 cardlogin">
                        <h2 className="card-header" style={{ color: 'grey' }}> <h1>{isLogin ? 'Login' : 'Sign up'}</h1></h2>
                        {!isLogin ? <h6>{misMatch && 'Password Mismatch!'}</h6> : ''}
                        <div className="card-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className='form-item'>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type='text'
                                        className='form-element'
                                        placeholder='Username or email'
                                        required />
                                </div>
                                <div className='form-item'>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type='password'
                                        className='form-element'
                                        placeholder='Password'
                                        required />
                                </div>

                                {!isLogin && <div className='form-item'>
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type='password'
                                        className='form-element'
                                        placeholder='Confirm password'
                                        required />
                                </div>}

                                <Link to={'/password'} className='resername'>Reset your password now</Link>
                                <div className='flex' >
                                    <button type="submit" className="btn btn-outline-info">{isLogin ? 'Login' : 'Sign Up'}</button>
                                </div>
                            </form>
                            <button
                                onClick={onLoginHandler}
                                type="submit"
                                className="btn btn-primary resername1">{isLogin ? 'Don`t Have an acount? Sign Up' : 'Have an acount? Login'}</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Login;