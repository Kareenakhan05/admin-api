import express from 'express';
import { check } from 'express-validator';
import { register_admin, login_admin, forgot_password, reset_password, approve_recruiter, reject_recruiter, delete_user } from '../controllers/admin_controller.js';
import { validate_request } from '../middlewares/validate_request.js';

const router = express.Router();

// Register Admin with validation
router.post('/register', validate_request([
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('name').notEmpty().withMessage('Name is required'),
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('role').notEmpty().withMessage('Role is required')  // Add role validation if needed
]), register_admin);

// Admin Login with validation
router.post('/login', validate_request([
    check('email').isEmail().withMessage('Invalid email'),
    check('password').notEmpty().withMessage('Password is required')
]), login_admin);

// Forgot Password (Send OTP) with validation
router.post('/forgot-password', validate_request([
    check('email').isEmail().withMessage('Invalid email')
]), forgot_password);

// Reset Password with OTP Verification
router.post('/reset-password', validate_request([
    check('email').isEmail().withMessage('Invalid email'),
    check('otp').isNumeric().withMessage('OTP must be a 6-digit number'),
    check('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]), reset_password);

// Approve Recruiter
router.post('/approve-recruiter/:userId', approve_recruiter);

// Reject Recruiter
router.post('/reject-recruiter/:userId', reject_recruiter);

// Delete User
router.delete('/delete-user/:userId', delete_user);

export default router;
