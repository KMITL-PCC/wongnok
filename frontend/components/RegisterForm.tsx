// src/app/RegisterForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import "@/app/register.css";
import { ArrowLeft, Home } from 'lucide-react'; 

const RegisterForm = () => {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (showErrorPopup) {
      const timer = setTimeout(() => {
        setShowErrorPopup(false);
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorPopup]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // <<< ปรับการตรวจสอบฟิลด์ให้รวม Username ด้วย
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      setErrorMessage('Please fill in all fields.');
      setShowErrorPopup(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setShowErrorPopup(true);
      return;
    }

    setErrorMessage('Registration Successful!');
    setShowErrorPopup(true);
    // ในโปรเจกต์จริง คุณจะต้องส่งข้อมูลไปยัง Backend เพื่อลงทะเบียน
    console.log({ username, email, password }); 
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleGoBack = () => {
    alert('Go back to previous page!');
    
  };

  const handleGoHome = () => { // <<< ฟังก์ชันสำหรับปุ่ม Home
    alert('Go to Home page!');
    
  };

  return (
    <div className="full-screen-container">
      {/* Arrow Back Button (ซ้ายบน) */}
      <button onClick={handleGoBack} className="back-arrow-button">
        <ArrowLeft size={28} color="#555" />
      </button>

      {/* Home Icon Button (ขวาบน) */}
      <button onClick={handleGoHome} className="home-icon-button"> 
        <Home size={28} color="#555" />
      </button>

      {/* Popup Error/Success Message */}
      {showErrorPopup && (
        <div className={`popup-message ${errorMessage.includes('Successful') ? 'success' : 'error'}`}>
          {errorMessage}
        </div>
      )}

      {/* Left Image Container */}
      <div className={`left-image-container ${imageLoaded ? 'loaded' : ''}`}>
        <img
          src="/images/restaurant.jpg"
          alt="Restaurant"
          className="restaurant-image"
          onLoad={handleImageLoad}
        />
      </div>

      {/* Register Panel on the Right */}
      <div className="register-panel-right">
        <h1 className="welcome-title">Create Account</h1>
        <h2 className="design-school-text">to Get Started</h2>

        {/* <<< เพิ่มช่องกรอก Username */}
        <div className="form-group">
          <input
            type="text" 
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group password-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group password-group">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button" onClick={handleSubmit}>
          Register Now
        </button>

        <p className="register-text">
          Already have an account?{' '}
          <a href="#" className="register-link" onClick={() => alert('Go to Login page.')}>
            Login
          </a>
        </p>
        
        {/* <<< ย้ายปุ่ม Google มาไว้ข้างล่างสุด */}
        <div className="or-divider"> {/* อาจจะไม่จำเป็นถ้ามีปุ่มเดียว แต่คงไว้เผื่ออนาคต */}
          <span>OR</span>
        </div>
        <button className="social-login-button google-button" onClick={() => alert('Sign up with Google clicked!')}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="social-icon" />
          Sign up with Google
        </button>

      </div>
    </div>
  );
};

export default RegisterForm;