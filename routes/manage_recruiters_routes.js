const express = require('express');
const router = express.Router();
const { validate_id } = require('../validators/manage_recruiter_validators'); // Import validator
const recruiterController = require('../controllers/manage_recruiters_controller');
const authMiddleware = require('../middlewares/auth_middleware');

// ✅ Routes for Recruiter Management
router.get('/', authMiddleware, recruiterController.get_recruiters);

router.get('/:id', 
    authMiddleware, 
    validate_id, 
    recruiterController.get_recruiter_details
);

router.put('/:id/approve', 
    authMiddleware, 
    validate_id, 
    recruiterController.approve_recruiter
);

router.put('/:id/reject', 
    authMiddleware, 
    validate_id, 
    recruiterController.reject_recruiter
);

router.delete('/:id', 
    authMiddleware, 
    validate_id, 
    recruiterController.delete_recruiter
);

module.exports = router;
