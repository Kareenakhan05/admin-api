const { check } = require("express-validator");

const validate_dashboard = [
    check("admin_id").isMongoId().withMessage("Invalid admin ID")
];

module.exports = { validate_dashboard };
