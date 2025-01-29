
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

let otpStore = {};  // Temporary in-memory storage for OTPs

// Send OTP
export const sendOtp = (email) => {
    const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    const expiry = Date.now() + parseInt(process.env.OTP_EXPIRY_TIME, 10);

    // Store OTP with expiry time
    otpStore[email] = { otp, expiry };

    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. It is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sending email:', err);
            return false;
        }
        console.log('Email sent:', info.response);
        return true;
    });
};

// Verify OTP
export const verifyOtp = (email, otp) => {
    if (otpStore[email] && otpStore[email].expiry > Date.now()) {
        if (otpStore[email].otp === otp) {
            delete otpStore[email];  // Delete OTP after successful verification
            return true;
        }
    }
    return false;
};
