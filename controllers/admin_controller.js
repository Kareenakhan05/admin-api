import Admin from '../models/admin.js';
import User from '../models/user.js';

import { generate_token, hash_password, compare_password } from '../helpers/auth_helpers.js';
import { send_response } from '../helpers/response_helper.js';
import { send_otp, verify_otp } from '../services/otp_services.js';
import { validationResult } from 'express-validator';

// Register Admin with OTP verification
export async function register_admin(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return send_response(res, 400, 'Validation error', errors.array());
        }

        const { email, password, name, phone, role, otp } = req.body;

        const existing_admin = await Admin.findOne({ email });
        if (existing_admin) {
            return send_response(res, 400, 'Admin already registered');
        }

        // Verify OTP
        if (!verifyOtp(email, otp)) {
            return send_response(res, 400, 'Invalid or expired OTP');
        }

        const hashed_password = await hash_password(password);
        const new_admin = new Admin({ email, password: hashed_password, name, phone, role });
        await new_admin.save();

        send_response(res, 201, 'Admin registered successfully');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
}

// Admin Login
export async function login_admin(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return send_response(res, 400, 'Validation error', errors.array());
        }

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return send_response(res, 404, 'Admin not found');
        }

        if (!(await compare_password(password, admin.password))) {
            return send_response(res, 401, 'Invalid credentials');
        }

        const token = generate_token(admin._id);
        send_response(res, 200, 'Login successful', { token });
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
}

// Forgot Password
export async function forgot_password(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return send_response(res, 400, 'Validation error', errors.array());
        }

        const { email } = req.body;

        if (!(await Admin.findOne({ email }))) {
            return send_response(res, 404, 'Admin not found');
        }

        sendOtp(email);

        send_response(res, 200, 'OTP sent to email for password reset');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
}

// Reset Password (Change Password)
export async function reset_password(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return send_response(res, 400, 'Validation error', errors.array());
        }

        const { email, otp, new_password } = req.body;

        if (!verifyOtp(email, otp)) {
            return send_response(res, 400, 'Invalid or expired OTP');
        }

        const hashed_password = await hash_password(new_password);
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return send_response(res, 404, 'Admin not found');
        }

        admin.password = hashed_password;
        await admin.save();

        send_response(res, 200, 'Password reset successfully');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
}

// Approve/Reject Recruiters
export async function approve_recruiter(req, res) {
    try {
        const { user_id } = req.params;

        const recruiter = await User.findById(user_id);
        if (!recruiter) {
            return send_response(res, 404, 'Recruiter not found');
        }

        recruiter.status = 'approved';
        await recruiter.save();

        send_response(res, 200, 'Recruiter approved successfully');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
}

export async function reject_recruiter(req, res) {
    try {
        const { user_id } = req.params;

        const recruiter = await User.findById(user_id);
        if (!recruiter) {
            return send_response(res, 404, 'Recruiter not found');
        }

        recruiter.status = 'rejected';
        await recruiter.save();

        send_response(res, 200, 'Recruiter rejected successfully');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
}

// Delete User
export async function delete_user(req, res) {
    try {
        const { user_id } = req.params;

        const user = await User.findById(user_id);
        if (!user) {
            return send_response(res, 404, 'User not found');
        }

        await user.remove();
        send_response(res, 200, 'User deleted successfully');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
}
