import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { send_response } from '../helpers/response_helper.js';

dotenv.config();

const otp_store = new Map(); // Use Map for better performance and scalability

// **Generate and Send OTP**
export const send_otp = async (email) => {
    try {
        const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
        const expiry = Date.now() + parseInt(process.env.OTP_EXPIRY_TIME, 10);

        // Store OTP with expiry time in Map
        otp_store.set(email, { otp, expiry });

        // Create reusable transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mail_options = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}. It is valid for ${process.env.OTP_EXPIRY_TIME / (1000 * 60)} minutes.`,
        };

        await transporter.sendMail(mail_options);
        console.log(`✅ OTP sent to ${email}: ${otp}`);
        return true;
    } catch (err) {
        console.error(`❌ Error sending OTP to ${email}:`, err);
        return false;
    }
};

// **Verify OTP**
export const verify_otp = (email, otp) => {
    try {
        if (!otp_store.has(email)) {
            console.log(`❌ OTP verification failed for ${email}: OTP not found.`);
            return false;
        }

        const { otp: stored_otp, expiry } = otp_store.get(email);

        if (Date.now() > expiry) {
            otp_store.delete(email);
            console.log(`❌ OTP verification failed for ${email}: OTP expired.`);
            return false;
        }

        if (stored_otp !== otp) {
            console.log(`❌ OTP verification failed for ${email}: Incorrect OTP.`);
            return false;
        }

        otp_store.delete(email); // Delete OTP after successful verification
        console.log(`✅ OTP verified for ${email}`);
        return true;
    } catch (err) {
        console.error(`❌ Error verifying OTP for ${email}:`, err);
        return false;
    }
};

// **Delete OTP**
export const delete_otp = (email) => {
    try {
        otp_store.delete(email);
        console.log(`🗑️ OTP deleted for ${email}`);
    } catch (err) {
        console.error(`❌ Error deleting OTP for ${email}:`, err);
    }
};
