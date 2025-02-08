const express = require('express');
const router = express.Router();

// Import Controllers
const { 
    register_admin, 
    login_admin, 
    forgot_password, 
    reset_password
} = require('../controllers/admin_auth_controller.js'); 

 

// Import Middlewares
const validate_request = require('../middlewares/validate_request.js'); 

// Import Validators
const { 
    registerAdminValidator, 
    loginAdminValidator, 
    forgotPasswordValidator, 
    resetPasswordValidator 
} = require('../validators/admin_auth_validators.js');

// ✅ Corrected Middleware Usage
router.post('/register', 
    validate_request(registerAdminValidator), // ✅ Pass validator array to validate_request
    register_admin
);

router.post('/login', 
    validate_request(loginAdminValidator), 
    login_admin
);

router.post('/forgot-password', 
    validate_request(forgotPasswordValidator), 
    forgot_password
);

router.post('/reset-password', 
    validate_request(resetPasswordValidator), 
    reset_password
);


module.exports = router;
