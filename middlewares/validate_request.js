const { validationResult } = require('express-validator');
const send_response = require('../helpers/response_helpers.js'); // Ensure this function is implemented correctly

// ✅ Validate Request Middleware
function validate_request(validations) {
    return async (req, res, next) => {
        try {
            // Execute all validation rules
            await Promise.all(validations.map((validation) => validation.run(req)));

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return send_response(res, 400, 'Validation error', errors.array()); // ❌ Stop execution and send response
            }

            // ✅ If no errors, proceed to the next middleware/controller
            next();
        } catch (err) {
            return send_response(res, 500, 'Validation middleware error', err.message); // ❌ Handle unexpected errors
        }
    };
}

// ✅ Export the validate_request function
module.exports = validate_request;
