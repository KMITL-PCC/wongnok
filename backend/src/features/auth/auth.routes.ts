import { Router } from "express";
import { isLogedIn, isAuthenticated } from "../../middleware/auth.middleware";
import authControllers from "./auth.controllers";
import passport from "../../config/passport";
import rateLimit from "express-rate-limit";

const router = Router();

//local
// router.post('/register', isLogedIn, authControllers.checkUser, authControllers.verifyOtp,authControllers.create)
router.post(
  "/register/send-otp",
  isLogedIn,
  authControllers.registerStep1_sendOtp
);
router.post(
  "/register/verify",
  authControllers.registerStep2_verifyOTPandCreateUser
);
router.post("/login", isLogedIn, authControllers.login);
router.post(
  "/forgotPass",
  rateLimit({ windowMs: 20 * 60 * 1000, max: 5 }),
  authControllers.forgotPass
);
router.post("/otp", authControllers.OTPverify);
router.post("/resend-otp", authControllers.resendOTP);
router.patch("/updatepass", authControllers.updatePass);

//google
router.get(
  "/google",
  isLogedIn,
  passport.authenticate("google", { scope: ["profile", "email"] }) // ขอสิทธิ์เข้าถึง profile และ email
);

// Endpoint ที่ Google จะเรียกกลับมาหลังจากการล็อกอินสำเร็จ/ไม่สำเร็จ
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL + "/", // Redirect ไปยังหน้า Dashboard ของ Frontend เมื่อล็อกอินสำเร็จ
    failureRedirect: process.env.FRONTEND_URL + "/fail", // Redirect ไปยังหน้า Login ของ Frontend เมื่อล็อกอินไม่สำเร็จ
  })
);

// router.get('/google/callback',
//     passport.authenticate('google', {failureRedirect: '/'}),
//     (req, res) => res.redirect('/')
// )

router.get("/logout", isAuthenticated, authControllers.logout);

export default router;
