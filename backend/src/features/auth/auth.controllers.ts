import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import prisma from '../../config/db.config';
import passport from '../../config/passport';
import { Role } from '../../../generated/prisma';

export default {
    //local
    create: async (req: Request, res: Response, next: NextFunction) => {
        const { username, email, password} = req.body

        if(!password && !(email||username)) {
            return res.status(400).json({ message: 'Username or email, and password are required.' });
        }

        try {
            //find existing user
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        {username},
                        {email}
                    ]
                }
            })

            if(existingUser) {
                if (existingUser.username === username) {
                return res.status(409).json({ message: 'Username already taken.' });
            }
            if (existingUser.email === email) {
                return res.status(409).json({ message: 'Email already registered.' });
            }
            }

            //hash password
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            //create new user
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email: email? email: null,
                    passwordHash,
                    role: Role.User
                }
            })

            res.status(201).json({ message: 'User registered and logged in successfully!', user: newUser });

        } catch (err) {
            console.error('ERRORR during registration', err)
            res.status(500).json({ message: 'Internal server error during registration.' });
        }
    },

    login: async(req: Request, res: Response, next: NextFunction) => {
        console.log('got req from log in')
        passport.authenticate('local', (err: any, user: Express.User | false, info: { message: string })=> {
            if (err) { 
                console.error('Passport Auth Error:', err);
                return next(err)
            }
            if (!user) {
                return res.status(401).json({message: info.message || 'login failed'})
            }

            req.login(user, (err) => {
                if (err) {return next(err)}
                res.status(200).json({ message: 'Logged in success', user})
            })
        })(req, res, next);
    }
}

