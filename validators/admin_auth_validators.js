import { check } from 'express-validator';

export const registerAdminValidator = [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('name').notEmpty().withMessage('Name is required'),
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('role').notEmpty().withMessage('Role is required')
];

export const loginAdminValidator = [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password is required')
];

export const forgotPasswordValidator = [
    check('email').isEmail().withMessage('Invalid email')
];

export const resetPasswordValidator = [
    check('email').isEmail().withMessage('Invalid email'),
    check('otp').isNumeric().withMessage('OTP must be a numeric value'),
    check('new_password').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];
