import bcrypt from 'bcrypt';

import prisma from '../../config/db.config';
import passport from '../../config/passport';
import { Role } from '../../../generated/prisma';

export default {
    create: async (username: string, email: string, password: string) => {
        //find existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        })

        if (existingUser) {
            if (existingUser.username === username) {
                return { success: false, status: 409, messeage: 'Username already taken.'}
                // return res.status(409).json({ message: 'Username already taken.' });
            }
            if (existingUser.email === email) {
                return { success: false, status: 409, messeage: 'Email already registered.'}
                // return res.status(409).json({ message: 'Email already registered.' });
            }
        }

        //hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        //create new user
        const newUser = await prisma.user.create({
            data: {
                username,
                email: email ? email : null,
                passwordHash,
            }
        })
        console.log(newUser)

        return { success: true, user: newUser}
    }
}