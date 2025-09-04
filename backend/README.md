# Backned tasetrail

## description

this is backend for review restaurant

## API endpoint

### test

- `GET /`
  For test API fetch

### CSRF

- `GET /api/csrf-token`
  Get csrf token for user before fetch PUT, POST, DELETE

### Authen

- `POST /auth/register/send-otp`  
  Register step 1 send otp to gmail  
  **Body:** `{ "username": "string", "email": "string", "password": "string" }`

- `POST /auth/register/verify`  
  Register step 2 verify otp and create user
  **Body:** `{ "otp": "string" }`

- `POST /auth/login`  
  Login with username/email and password.  
  **Body:** `{ "loginform": "string", "password": "string" }`

- `GET auth/logout`  
  Logout the current user.

- `POST /auth/forgotPass`  
  Request password reset OTP.  
  **Body:** `{ "email": "string" }`

- `POST /auth/verify-otp`  
  Verify OTP for password reset.  
  **Body:** `{ "otp": "string" }`

- `POST /auth/resend-otp`
  Resend OTP

- `PATCH /auth/updatepass`  
  Update password after OTP verification.  
  **Body:** `{ "newPassword": "string" }`

- `GET /auth/google`
  Login with google account

- `GET /auth/google/callback`
  Callback after google login
