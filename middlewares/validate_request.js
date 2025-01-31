import { validationResult } from 'express-validator';
import { send_response } from '../helpers/response_helper.js';

export function validate_request(validations) {
    return async (req, res, next) => {
        try {
            // Execute all validation rules
            await Promise.all(validations.map((validation) => validation.run(req)));

            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return send_response(res, 400, 'Validation error', errors.array());
            }

            // Proceed to the next middleware if validation passes
            next();
        } catch (err) {
            return send_response(res, 500, 'Validation middleware error', err.message);
        }
    };
}
