const { validationResult } = require('express-validator');
const send_response = require('../helpers/response_helper.js'); // Assuming this is your response helper function

// Validate Request Middleware
function validate_request(validations) {
    return async (req, res, next) => {
        try {
            // Execute all validation rules
            await Promise.all(validations.map((validation) => validation.run(req)));

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.statusCode = 400;
                req.message = 'Validation error';
                req.data = errors.array();
                return next(); // Pass to the next middleware (response handler)
            }

            // Proceed to the next middleware if validation passes
            next();
        } catch (err) {
            req.statusCode = 500;
            req.message = 'Validation middleware error';
            req.data = err.message;
            return next(); // Pass to the next middleware (response handler)
        }
    };
}

// Export the validate_request function
module.exports = validate_request;
