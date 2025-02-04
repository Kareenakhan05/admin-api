const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { send_response } = require('../helpers/response_helper.js');

dotenv.config();

// **Generate Token**
const generate_token = (user_id) => {
    try {
        const token = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY_TIME });
        return token;
    } catch (err) {
        console.error("❌ Error generating token:", err);
        return null;
    }
};

// **Compare Passwords**
const compare_passwords = async (plain_password, hashed_password) => {
    try {
        const isMatch = await bcrypt.compare(plain_password, hashed_password);
        return isMatch;
    } catch (err) {
        console.error("❌ Error comparing passwords:", err);
        return false;
    }
};

// **Middleware for User Authentication**
const authenticate_user = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return send_response(res, 401, 'No token, authorization denied');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("❌ Authentication failed:", err);
        return send_response(res, 401, 'Token is invalid or expired');
    }
};

// **Middleware for Admin Authentication**
const authenticate_admin = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return send_response(res, 401, 'No token, authorization denied');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== 'admin') {
            return send_response(res, 403, 'Not authorized as admin');
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error("❌ Admin authentication failed:", err);
        return send_response(res, 401, 'Token is invalid or expired');
    }
};

// **Export Functions using module.exports**
module.exports = {
    generate_token,
    compare_passwords,
    authenticate_user,
    authenticate_admin
};
