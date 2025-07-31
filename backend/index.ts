import express from 'express'; // ตัวอย่างการใช้ Express.js
import dotenv from 'dotenv'; 
import session from 'express-session';
import passport from './src/config/passport';
import cors from 'cors';
import { createClient } from 'redis'; // Redis client for redis@4.x
import RedisStore from 'connect-redis';
import morgan from 'morgan';

import authen from './src/features/auth/auth.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(morgan('dev'));

app.use(cors({
    origin: process.env.FRONTEND_URL, // อนุญาตเฉพาะ Frontend URL ของคุณ
    credentials: true // สำคัญ: อนุญาตให้ส่ง cookies/authorization headers ข้าม domain ได้
}));

app.use(express.json()); // สำหรับ parsing application/json
app.use(express.urlencoded({ extended: true })); // สำหรับ parsing application/x-www-form-urlencoded

// --- ตั้งค่า Redis Client และ Session Store ---
// const redisClient = createClient({
//     url: process.env.REDIS_URL // URL ของ Redis Server
// });

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

// // ต้องเชื่อมต่อ Redis Client ก่อนที่จะใช้ใน Session Store
// (async () => {
//     await redisClient.connect();
//     console.log('Connected to Redis for session store');
// })();

// const sessionStore = new RedisStore({ client: redisClient });

app.use(session({
    secret: process.env.SESSION_SECRET as string, // ใช้ secret จาก env
    //store: sessionStore, // ใช้ Redis เป็น storage
    resave: false, // ไม่บันทึก session ซ้ำถ้าไม่มีการเปลี่ยนแปลง
    saveUninitialized: false, // ไม่สร้าง session ใหม่ถ้าไม่มีการเปลี่ยนแปลง
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 ชั่วโมง (ใน milliseconds)
        httpOnly: true, // ป้องกัน JavaScript client-side เข้าถึง cookie
        secure: process.env.NODE_ENV === 'production', // ส่ง cookie ผ่าน HTTPS เท่านั้นใน Production
        sameSite: 'lax' // แนะนำสำหรับ CORS, 'none' ถ้าต้องการเปิดกว้างกว่า (ต้องใช้ secure: true)
    }
}));


app.use(passport.initialize());
app.use(passport.session()); 

app.use('/auth', authen)
app.get('/', (req, res) => {
    res.send("hello world");
})



app.listen(PORT, () => {
    console.log('app runnig on port :', PORT)
})