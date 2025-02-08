const jwt = require('jsonwebtoken');
const responseHelper = require('../helpers/response_helpers');
const User = require('../models/user'); // Import the user model

const auth_middleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return responseHelper.unauthorized(res, 'Access denied. No token provided.');
        }

        // Verify token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

        // Find the user
        const user = await User.findById(decoded.id);
        if (!user) {
            return responseHelper.unauthorized(res, 'Invalid token.');
        }

        // Check if user is an admin
        if (user.role !== 'admin') {
            return responseHelper.forbidden(res, 'Access denied. Admins only.');
        }

        req.user = user; // Attach user details to request
        next();
    } catch (error) {
        return responseHelper.error(res, 'Authentication failed.');
    }
};

module.exports = auth_middleware;
