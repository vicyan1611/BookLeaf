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
    const htmlPath = path.join(__dirname, '../public/html/reset-pass-mail.html')
    const html = fs.readFileSync(htmlPath, 'utf-8')
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Bookleaf account verification code',
        html: html.replace('{code}', code),
        priority: "high" as "high",
        attachments: [{
            filename: 'logo.png',
            path: path.join(__dirname, '../public/image/BookLeaf_Logo_NoBG.png'),
            cid: 'logo'
        }]
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