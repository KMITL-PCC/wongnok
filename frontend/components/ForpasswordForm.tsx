// src/app/ForgotPasswordForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import "@/app/forpassword.css";
import { ArrowLeft, Home } from 'lucide-react'; 

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  useEffect(() => {
    if (showMessagePopup) {
      const timer = setTimeout(() => {
        setShowMessagePopup(false);
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessagePopup]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (email === '') {
      setMessage('Please enter your email address.');
      setShowMessagePopup(true);
      return;
    }

    console.log('Sending password reset link to:', email);
    setMessage('Password reset link sent to your email!');
    setShowMessagePopup(true);
    setEmail('');
  };

  const handleGoBack = () => {
    alert('Go back to Login page!');
    // window.history.back();
  };

  const handleGoHome = () => { 
    alert('Go to Home page!');
    // router.push('/');
  };

  return (
    <div className="centered-full-screen-container">
      {/* Arrow Back Button (ซ้ายบน - คงเดิม) */}
      <button onClick={handleGoBack} className="back-arrow-button">
        <ArrowLeft size={28} color="#555" />
      </button>

      {/* Home Icon Button (ขวาบน - คงเดิม) */}
      <button onClick={handleGoHome} className="home-icon-button"> 
        <Home size={28} color="#555" />
      </button>

      {/* Popup Message (คงเดิม) */}
      {showMessagePopup && (
        <div className={`popup-message ${message.includes('sent') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* ส่วนหัวข้อและคำบรรยายที่อยู่ซ้ายบน (คงเดิม) */}
      <div className="top-left-header-section">
        <h1 className="top-left-heading">Forgot Password?</h1>
        <p className="top-left-description">Please enter your email to reset the password.</p>
      </div>

      {/* <<< ส่วนของเนื้อหาหลักที่ตอนนี้จะไปอยู่ซ้ายทั้งหมด */}
      <div className="forgot-password-content-wrapper">
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

        <button type="submit" className="login-button" onClick={handleSubmit}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;