const express = require("express");
const router = express.Router();
const { get_admin_overview, get_department_distribution } = require("../controllers/admin_dashboard_controller.js");
const { validate_dashboard } = require("../validators/dashboard_validator.js");

// ✅ Dashboard Overview
router.get("/admin/overview", validate_dashboard, get_admin_overview);

// ✅ Department Distribution
router.get("/admin/department-distribution", get_department_distribution);

module.exports = router;
