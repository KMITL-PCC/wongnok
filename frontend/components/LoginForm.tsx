"use client"

import React, { useEffect, useState } from 'react'
import "@/app/login.css"
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // ใช้สำหรับข้อความใน popup
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State สำหรับควบคุมการแสดง popup
  const [imageLoaded, setImageLoaded] = useState(false);

  // Effect สำหรับซ่อน popup อัตโนมัติ
  useEffect(() => {
    if (showErrorPopup) {
      const timer = setTimeout(() => {
        setShowErrorPopup(false);
        setErrorMessage(''); // ล้างข้อความ error ด้วย
      }, 3000); // Popup จะหายไปใน 3 วินาที
      return () => clearTimeout(timer); // Cleanup timer เมื่อ component unmount หรือ showErrorPopup เปลี่ยน
    }
  }, [showErrorPopup]);

  const handleSubmit = (event : React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (email === '' || password === '') {
      // ตรวจสอบว่ามีข้อมูลกรอกครบหรือไม่
      setErrorMessage('Please enter both email and password.');
      setShowErrorPopup(true); // แสดง popup
      return; // หยุดการทำงานถ้าข้อมูลไม่ครบ
    }

    if (email === 'test@example.com' && password === 'password') {
      // ถ้า Login สำเร็จ
      setErrorMessage('Login Successful!');
      setShowErrorPopup(true);
      // alert('Login Successful!'); // ไม่ใช้ alert แล้ว
      // อาจจะ redirect หรือทำอย่างอื่นต่อไป
    } else {
      // ถ้า Login ไม่สำเร็จ
      setErrorMessage('Invalid email or password.');
      setShowErrorPopup(true); // แสดง popup
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="full-screen-container">
      {/* Popup Error/Success Message */}
      {showErrorPopup && (
        <div className={`popup-message ${errorMessage.includes('Successful') ? 'success' : 'error'}`}>
          {errorMessage}
        </div>
      )}

      {/* ส่วนสำหรับรูปภาพด้านซ้าย */}
      <div className={`left-image-container ${imageLoaded ? 'loaded' : ''}`}>
        <img
          src="/images/restaurant.jpg" // เปลี่ยนเป็น path ที่ถูกต้องของรูปภาพคุณ
          alt="Restaurant"
          className="restaurant-image"
          onLoad={handleImageLoad}
        />
      </div>

      {/* ส่วน Login Panel ทางขวา */}
      <div className="login-panel-right">
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
  )
}

export default LoginForm
