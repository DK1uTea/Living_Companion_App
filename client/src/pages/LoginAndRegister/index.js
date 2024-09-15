import React, { useState } from 'react'
import './LoginAndRegister.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth, googleProvider, signInWithPopup } from '../../firebase/firebaseConfig.js';
import { useNavigate } from 'react-router-dom';

export default function LoginAndRegister({ setIsAuth, setUser }) {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [usernameRegister, setUsernameRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const navigate = useNavigate();

    const handleOnSubmitRegister = async (e) => {
        e.preventDefault();
        if (confirmPassword !== passwordRegister) {
            alert('Password do not match!');
            return;
        }
        const reqData = {
            username: usernameRegister,
            email,
            password: passwordRegister,
        };
        try {
            await axios.post('http://localhost:3001/api/register', reqData);
            console.log('submit register!');
            console.log("Register successful!")
            setIsRightPanelActive(false);
            alert('Registration successful!');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('Email already exists!');
            } else {
                alert('Registration failed!');
            }
            console.error("Error register: ", error);
        }
    };

    const handleOnSubmitLogin = async (e) => {
        e.preventDefault();
        const reqData = {
            username: usernameLogin,
            password: passwordLogin
        };
        try {
            const res = await axios.post('http://localhost:3001/api/login', reqData);
            console.log('submit login');
            // Save user session information
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsAuth(true);
            navigate('/home-page');
            console.log('Login successfully!');
        } catch (error) {
            console.error('Error login: ', error);
            alert('Login failed!');
        }
    };

    const handleSocialLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const { user } = result;
            console.log(user);
            // Extract needed user details from Firebase user object
            const reqData = {
                username: user.displayName,
                email: user.email,
                uid: user.uid || user.providerData[0]?.uid,
                provider: 'google',
            };
            console.log(reqData);
            const res = await axios.post('http://localhost:3001/api/social-login', reqData);
            console.log(res);
            // Save user session information
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            setIsAuth(true);
            navigate('/home-page');
        } catch (error) {
            console.error('Error during Google sign-in:', error);
            alert('Google login failed!');
        }
    };

    return (
        <div className='login-register-container'>
            <div className={`login-register-main-container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleOnSubmitRegister}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={usernameRegister}
                            onChange={(e) => setUsernameRegister(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={passwordRegister}
                            onChange={(e) => setPasswordRegister(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Confirm your password'
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleOnSubmitLogin}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <FontAwesomeIcon
                                icon={faGoogle}
                                style={{
                                    border: '2px solid #000', // Set the color of the circle border
                                    borderRadius: '50%',         // Make the border circular
                                    padding: '10px',             // Add padding to space the icon within the circle
                                    fontSize: '20px',            // Adjust the size of the icon
                                    color: '#000',            // Set the color of the Google icon
                                    cursor: 'pointer',           // Add pointer cursor effect on hover
                                    transition: '0.3s',          // Smooth transition for hover effects
                                }}
                                onClick={handleSocialLogin}
                            />
                        </div>
                        <span>or use your account</span>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={usernameLogin}
                            onChange={(e) => setUsernameLogin(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={passwordLogin}
                            onChange={(e) => setPasswordLogin(e.target.value)}
                        />
                        <a href="#">Forgot your password?</a>
                        <button type='submit'>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={() => { setIsRightPanelActive(false) }}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => { setIsRightPanelActive(true) }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
