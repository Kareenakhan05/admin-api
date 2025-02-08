const { param } = require('express-validator');

// ✅ Validate Recruiter ID in params
const validate_id = [
    param('id').isMongoId().withMessage('Invalid recruiter ID format')
];

module.exports = { validate_id };
