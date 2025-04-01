import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignUpPage.css';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleSendOtp = () => {
        console.log(`Sending OTP to ${email}`);
        setIsOtpSent(true);
    };

    const handleVerifyOtp = () => {
        console.log(`Verifying OTP: ${otp}`);
        alert('OTP Verified Successfully!');
    };

    const handleGoogleSignIn = () => {
        console.log('Signing in with Google');
        alert('Signed in with Google!');
    };

    const handleLogin = () => {
        navigate('/');
    };

    return (
        <div className="sign-up-page">
            <nav className="navbar">
                <img src="/public/vite.svg" alt="logo" className="logo" />
                <div className="social-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                </div>
                <button className="signup-button" onClick={handleLogin}>Login</button>
            </nav>

            <h2>Sign Up</h2>
            <div className="card">
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="input-field"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        className="input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {isOtpSent && (
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="input-field"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    )}
                    {!isOtpSent ? (
                        <button className="otp-button" onClick={handleSendOtp}>
                            Send OTP
                        </button>
                    ) : (
                        <button className="otp-button" onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>
                    )}

                <button className="google-signin" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SignUpPage;
