// src/Login.js (หรือ LoginForm.tsx)
"use client"

import React, { useEffect, useState } from 'react'
import "@/app/login.css"
import { ArrowLeft } from 'lucide-react'; // <<< Import ArrowLeft เข้ามา

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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

  const handleSubmit = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setErrorMessage('Please enter both email and password.');
      setShowErrorPopup(true);
      return;
    }

    if (email === 'test@example.com' && password === 'password') {
      setErrorMessage('Login Successful!');
      setShowErrorPopup(true);
    } else {
      setErrorMessage('Invalid email or password.');
      setShowErrorPopup(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleGoBack = () => {
      alert('Go back functionality will be implemented here!');
      // ตัวอย่าง: ถ้าใช้ Next.js router.back();
      // หรือ window.history.back();
  };

  return (
    <div className="full-screen-container">
      {/* ตำแหน่งของลูกศร (ย้ายมาไว้ตรงนี้) */}
      <button onClick={handleGoBack} className="back-arrow-button">
          <ArrowLeft size={28} color="#555" /> {/* เพิ่มขนาดให้มองเห็นง่ายขึ้น */}
      </button>

      {showErrorPopup && (
        <div className={`popup-message ${errorMessage.includes('Successful') ? 'success' : 'error'}`}>
          {errorMessage}
        </div>
      )}

      <div className={`left-image-container ${imageLoaded ? 'loaded' : ''}`}>
        <img
          src="/images/restaurant.jpg"
          alt="Restaurant"
          className="restaurant-image"
          onLoad={handleImageLoad}
        />
      </div>

      <div className="login-panel-right">
        {/* ไม่มีลูกศรอยู่ตรงนี้แล้ว */}
        <h1 className="welcome-title">Welcome</h1>
        <h2 className="design-school-text">to Your Account</h2>

        <button className="social-login-button google-button" onClick={() => alert('Login with Google clicked!')}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="social-icon" />
          Login with Google
        </button>

        <div className="or-divider">
          <span>OR</span>
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Example@gmail.com"
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

        <div className="remember-forgot-row">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <a href="#" className="forgot-password-link" onClick={() => alert('Forgot Password functionality will be implemented here.')}>
              Forgot Password?
          </a>
        </div>

        <button type="submit" className="login-button" onClick={handleSubmit}>
          Login
        </button>

        <p className="register-text">
          Don't have an account?{' '}
          <a href="#" className="register-link" onClick={() => alert('Register page will be here.')}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;