import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { createClient } from 'redis'; // Redis client for redis@4.x
import RedisStore from 'connect-redis'; // Session store for Redis
import passport from '../config/passport'; 
import { Role } from '../../generated/prisma/client';

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
        if (req.user && req.user.role === role) {
            return next();
        }
        res.status(403).json({ message: 'Forbidden: You do not have the necessary permissions.' });
    };
}