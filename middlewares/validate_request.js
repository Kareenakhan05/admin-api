import { validationResult } from 'express-validator';

export function validate_request(validations) {
    return async (req, res, next) => {
        // Run all validation rules
        await Promise.all(validations.map((validation) => validation.run(req)));

        // Check if there are any validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Proceed to the next middleware if validation passes
        next();
    };
}
