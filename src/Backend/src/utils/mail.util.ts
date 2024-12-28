import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import fs from 'fs'
import path from 'path'
config();

const transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});


const sendVerificationCode = async (email: string, code: string) => {
    const htmlPath = path.join(__dirname, '../public/html/mail.html')
    const html = fs.readFileSync(htmlPath, 'utf-8')
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Verification Code',
        html: html.replace('{code}', code),
        priority: "high" as "high"
    }
    transpoter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default sendVerificationCode;