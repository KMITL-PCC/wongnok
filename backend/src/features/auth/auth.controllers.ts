import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import prisma from '../../config/db.config';
import passport from '../../config/passport';
import { Role } from '../../../generated/prisma';
import authServices from './auth.services';

export default {
    //local
    create: async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body

        if (!password && !(email || username)) {
            return res.status(400).json({ message: 'Username or email, and password are required.' });
        }

        try {
            const result = await authServices.create(username, email, password)

            if (result && !result.success) {
                res.status(result.status ?? 409).json({ message: result.messeage })
            }

            console.log(result.user);
            req.login(result.user as Express.User, (err) => {
                if (err) {
                    console.error('Error auto-logging in after registration:', err);
                    // ถ้าล็อกอินอัตโนมัติไม่สำเร็จ ยังคงส่ง user data กลับไป
                    return res.status(201).json({ message: 'User registered successfully, but failed to auto-login. Please try logging in manually.', user: result.user?.username });
                }
                // ส่งข้อมูลผู้ใช้ที่ลงทะเบียนและล็อกอินสำเร็จกลับไป
                res.status(201).json({ message: 'User registered and logged in successfully!', user: result.user?.username });
            });

        } catch (err) {
            console.error('ERRORR during registration', err)
            res.status(500).json({ message: 'Internal server error during registration.' });
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        console.log('got req from log in')
        passport.authenticate('local', (err: any, user: Express.User | false, info: { message: string }) => {
            if (err) {
                console.error('Passport Auth Error:', err);
                return next(err)
            }
            if (!user) {
                return res.status(401).json({ message: info.message || 'login failed' })
            }

            req.login(user, (err) => {
                if (err) { return next(err) }
                res.status(200).json({ message: 'Logged in success', user })
            })
        })(req, res, next);
    }
}

