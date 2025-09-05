import { Request, Response, NextFunction } from 'express';
import passport from '../config/passport'; 
import { Role, User } from '../../generated/prisma/client';

// --- Authentication Middleware ---
// ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    // ส่ง Unauthorized response หรือ redirect ไปหน้า login
    res.status(401).json({ message: 'Unauthorized: Please log in.' });
}

// ตรวจสอบ Role ของผู้ใช้
export function hasRole(role: Role) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized: Please log in.' });
        }
        // ตรวจสอบ role ของผู้ใช้ที่ล็อกอิน
       const user = req.user as User;
        if (user && user.role === role) {
            return next();
        }
        res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions.' });
    };
}

export function isLogedIn(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'you are logged in , pls log out'})
    }
}

export function invalidCsrf(err: any, req: Request, res: Response, next: NextFunction) {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({
            message: 'Invalid CSRF token. Please refresh the page and try again.'
        });
    }

    next(err);
}