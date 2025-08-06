
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile } from 'passport-google-oauth20'; // Import Profile type for clarity
import prisma from './db.config'; // Import Prisma client
import { Role } from '../../generated/prisma/client'; // Import Prisma's User model and Role enum
import bcrypt from 'bcrypt'; // สำหรับ Local Strategy (ถ้าใช้)
import { Strategy as LocalStrategy } from 'passport-local'; // สำหรับ Local Strategy (ถ้าใช้)


// --- Passport Local Strategy (สำหรับ Username/Password Login) ---
passport.use(new LocalStrategy(
    {
        usernameField: 'loginform', 
        passwordField: 'password',
    },
    async (loginform : string, password: string, done) => {
        try {
            console.log(`loginform : ${loginform} and passowrd: ${password}`)

            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginform);
            const user = await prisma.user.findUnique({
                where: isEmail ? { email: loginform } : { username: loginform }
            });

            if (!user) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            if (!user.passwordHash) {
                // ผู้ใช้ที่ลงทะเบียนด้วย Google อาจไม่มี passwordHash
                return done(null, false, { message: 'This account can only be logged in via Google.' });
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }

            done(null, user as Express.User);
        } catch (err) {
            done(err);
        }
    }
));

// --- Passport Google Strategy ---
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL // Endpoint ใน Backend ที่ Google จะส่งผู้ใช้กลับมา
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: Express.User | false) => void) => {
        try {
            const googleId = profile.id;
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
            const username = profile.displayName || email?.split('@')[0] || 'User';
            // const picture = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
            //const username = `google_${googleId}`; // สร้าง username ที่ไม่ซ้ำกันสำหรับ Google user

            if (!email) {
                return done(new Error('Google account must have an email address.'), false);
            }

            // ค้นหาผู้ใช้ด้วย googleId หรือ email
            let user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { googleId: googleId },
                        { email: email }
                    ]
                }
            });

            if (!user) {
                // ถ้าไม่พบผู้ใช้: สร้างบัญชีใหม่
                user = await prisma.user.create({
                    data: {
                        username: username, // กำหนด username สำหรับ Google user
                        email: email,
                        googleId: googleId,
                        role: Role.User // ใช้ Role enum จาก Prisma
                    }
                });
                console.log('New user registered with Google:', user.email);
            } else if (!user.googleId) {
                // ถ้าพบบัญชีเดิมด้วยอีเมล แต่ยังไม่มี googleId: เชื่อมโยงบัญชี
                // ควรตรวจสอบว่า username ไม่ซ้ำกันก่อน update
                if (!user.username) {
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { googleId: googleId, username: username } // ตั้ง username ให้ Google user ด้วย
                    });
                } else {
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { googleId: googleId }
                    });
                }
                console.log('Existing user linked with Google:', user.email);
            } 

            // คืน user object เพื่อให้ Passport เก็บใน session
            done(null, user as Express.User);

        } catch (error) {
            console.error("Error during Google authentication:", error);
            done(error, false);
        }
    }
));

passport.serializeUser((user, done) => {
    console.log('serializeUser User ID to session:', user.id);
    done(null, user.id);
});


passport.deserializeUser(async (id: string, done) => {
    console.log('deserializeUser: User ID from session:', id);
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (user) {
            // ต้อง Cast เป็น Express.User เพราะ Passport คาดหวัง Type นี้
            done(null, user as Express.User);
        } else {
            done(null, false); // ไม่พบผู้ใช้
        }
    } catch (err) {
        console.error('deserializeUser Error:', err);
        done(err);
    }
});

export default passport;