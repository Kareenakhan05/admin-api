const express = require('express');
const { 
    register_admin, 
    login_admin, 
    forgot_password, 
    reset_password, 
    
} = require('../controllers/admin_auth_controller.js'); // Use require for importing controllers
const { 
    get_dashboard_stats, 
    get_job_dashboard_stats 
} = require('../controllers/admin_dashboard_controller.js'); // Importing the dashboard APIs
const { validate_request } = require('../middlewares/validate_request.js');

// Importing validators
const { 
    registerAdminValidator, 
    loginAdminValidator, 
    forgotPasswordValidator, 
    resetPasswordValidator 
} = require('../validators/admin_auth_validators.js');

const router = express.Router();

// Register Admin with validation
router.post('/register', 
    validate_request(registerAdminValidator), 
    register_admin
);

// Admin Login with validation
router.post('/login', 
    validate_request(loginAdminValidator), 
    login_admin
);

// Forgot Password (Send OTP) with validation
router.post('/forgot-password', 
    validate_request(forgotPasswordValidator), 
    forgot_password
);

// Reset Password with OTP Verification
router.post('/reset-password', 
    validate_request(resetPasswordValidator), 
    reset_password
);



// Admin Dashboard - Fetch user and recruiter statistics
router.get('/dashboard', 
    get_dashboard_stats // Admin stats API
);

// Job Portal Dashboard - Fetch job-related statistics
router.get('/job-dashboard', 
    get_job_dashboard_stats // New job portal dashboard stats API
);

module.exports = router; // Use module.exports to export the router
