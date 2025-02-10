const { check } = require('express-validator');

const register_admin_validator = [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('name').notEmpty().withMessage('Name is required'),
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('role').notEmpty().withMessage('Role is required')
];

const login_admin_validator = [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password is required')
];

const forgot_password_validator = [
    check('email').isEmail().withMessage('Invalid email')
];

const reset_password_validator = [
    check('email').isEmail().withMessage('Invalid email'),
    check('otp').isNumeric().withMessage('OTP must be a numeric value'),
    check('new_password').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

const logout_admin_validator = [
    check('token').notEmpty().withMessage('Token is required')  // Assuming logout requires a token
];


module.exports = {
    register_admin_validator,
    login_admin_validator,
    forgot_password_validator,
    reset_password_validator,
    logout_admin_validator
};
