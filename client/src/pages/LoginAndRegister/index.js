import React, { useState } from 'react'
import './styles.css';
import axios from 'axios';

export default function LoginAndRegister() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [usernameRegister, setUsernameRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const handleOnSubmitRegister = async (e) => {
        e.preventDefault();
        if(confirmPassword !== passwordRegister){
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
            if(error.response && error.response.status === 400){
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
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            console.log('Login successfully!');
            alert('Login succesful!');
        } catch (error) {   
            console.error('Error login: ', error);
            alert('Login failed!');
        }
    };
    
    return (
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleOnSubmitRegister}>
                    <h1>Create Account</h1>
                    {/* <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span> */}
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
                    {/* <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span> */}
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

    )
}
