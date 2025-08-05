import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import prisma from '../../config/db.config';
import passport from '../../config/passport';
import { Role, User } from '../../../generated/prisma';
import authServices from './auth.services';

export default {
    //send otp to create user email
    registerStep1_sendOtp: async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password } = req.body

        if (!password && !email && !username) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        try {
            const result = await authServices.checkUserExistence(username, email, password)

            if (result && !result.success && result.status) {
                res.status(result.status).json({ message: result.messeage })
            }

            const { otp, expiresAt } = await authServices.sendVerificationOtp(email);

            //hash password
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const session = req.session as any;
            session.registerData = {
                username,
                email,
                passwordHash,
                otp,
                expiresAt: expiresAt.toISOString()
            }

            res.status(200).json({
            message: 'OTP sent to your email. Please verify to complete registration.'
        });
        } catch (err) {
            console.error('ERRORR during user validate', err)
            res.status(500).json({ message: 'Internal server error during registration.' });
        }
    },

    // verify otp and create user to db
    registerStep2_verifyOTPandCreateUser: async (req: Request, res: Response, next: NextFunction) => {
        const { otp } = req.body;

        if(!otp) {
            return res.status(401).json({ message: 'Invalid OTP. Please try again.' });
        }

        const session = req.session as any;
        if (!session || !session.registerData || !session.registerData.otp) {
            return res.status(401).json({ message: 'No pending registration. Please start registration again.' });
        }

        const { username, email, passwordHash, otp: storedOtp, expiresAt: storedExpiresAt } = session.registerData

        if (storedOtp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP. Please try again.' });
        }

        if (new Date() > new Date(otp.otpExpiresAt)) {
            delete session.registrationData;
            return res.status(401).json({ message: 'OTP has expired. Please request a new one.' });
        }

        try {
            const newUser = await authServices.create(username, email, passwordHash)

            delete session.registrationData;

            req.login(newUser as Express.User, (err) => {
                if (err) {
                    console.error('Error auto-logging in after registration:', err);
                    return res.status(201).json({ message: 'User registered successfully, but failed to auto-login. Please try logging in manually.', user: newUser.username });
                }
                res.status(201).json({ message: 'User registered and logged in successfully!', user: newUser.username });
            });
        } catch (err) {
            console.error('ERROR during user creation after OTP verification:', err);
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
    },

    logout: async (req: Request, res: Response, next: NextFunction) => {
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
    },
}

