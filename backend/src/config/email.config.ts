import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', // หรือ 'SendGrid', 'Mailgun', etc.
    auth: {
        user: process.env.EMAIL_USER, // อีเมลสำหรับส่ง
        pass: process.env.EMAIL_PASS, // รหัสผ่านหรือ App Password
    },
});

export default transporter;