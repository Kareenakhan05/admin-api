const Admin = require('../../models/admin.js');
const User = require('../../models/user.js');  // Assuming you have a User model for recruiters and users
const { generate_token, hash_password, compare_password } = require('../../helpers/authHelper.js');
const { send_response } = require('../../helpers/responseHelper.js');
const { sendOtp, verifyOtp } = require('../../services/otpService.js');
const { validationResult } = require('express-validator');

// Register Admin with OTP verification
const register_admin = async (req, res) => {
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
};

// Admin Login
const login_admin = async (req, res) => {
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
};

// Forgot Password
const forgot_password = async (req, res) => {
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
};

// Reset Password (Change Password)
const reset_password = async (req, res) => {
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
};

// Approve Recruiter
const approve_recruiter = async (req, res) => {
    try {
        const { user_id } = req.params;

        const recruiter = await User.findById(user_id);
        if (!recruiter) {
            return send_response(res, 404, 'Recruiter not found');
        }

        recruiter.status = 'approved'; // Assuming status is the field that indicates approval
        await recruiter.save();

        send_response(res, 200, 'Recruiter approved successfully');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
};

// Reject Recruiter
const reject_recruiter = async (req, res) => {
    try {
        const { user_id } = req.params;

        const recruiter = await User.findById(user_id);
        if (!recruiter) {
            return send_response(res, 404, 'Recruiter not found');
        }

        recruiter.status = 'rejected'; // Assuming status is the field that indicates rejection
        await recruiter.save();

        send_response(res, 200, 'Recruiter rejected successfully');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
};

// Delete User
const delete_user = async (req, res) => {
    try {
        const { user_id } = req.params;

        const user = await User.findByIdAndDelete(user_id);
        if (!user) {
            return send_response(res, 404, 'User not found');
        }

        send_response(res, 200, 'User deleted successfully');
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
};

// Export the controller functions
module.exports = {
    register_admin,
    login_admin,
    forgot_password,
    reset_password,
    approve_recruiter,
    reject_recruiter,
    delete_user
};
