import { Router, Request, Response, NextFunction } from "express";
import authControllers from './auth.controllers';
import passport from "../../config/passport";

const router = Router()

//local
router.post('/register', authControllers.create)
router.post('/login', authControllers.login)
// router.post('/logout', authControllers.logout)

//google
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }) // ขอสิทธิ์เข้าถึง profile และ email
);

// Endpoint ที่ Google จะเรียกกลับมาหลังจากการล็อกอินสำเร็จ/ไม่สำเร็จ
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.FRONTEND_URL + '/', // Redirect ไปยังหน้า Dashboard ของ Frontend เมื่อล็อกอินสำเร็จ
        failureRedirect: process.env.FRONTEND_URL + '/fail' // Redirect ไปยังหน้า Login ของ Frontend เมื่อล็อกอินไม่สำเร็จ
    })
);

// router.get('/google/callback',
//     passport.authenticate('google', {failureRedirect: '/'}),
//     (req, res) => res.redirect('/')
// )

router.get('/logout',(req: Request, res:Response, next:NextFunction) => {
    req.logout((err: any) => {
        if (err) {
            console.error('Error during Passport logout:', err)
            return next(err)
        }
        req.session.destroy((err: any) => {
            if (err) {
                console.error('Error during destroying session:', err)
                return next(err)
            }

            res.clearCookie('connect.sid');

            res.status(200).json({ message: 'Logged out successfully' });
        })
    })
} );

export default router;