const Job = require('../models/job.js');
const User = require('../models/user.js');
const Subscription = require('../models/subscription.js');
const Company = require('../models/company.js');
const Visitor = require('../models/visitor.js');
const { responseHandler } = require('../helpers/response_helpers.js');

// ✅ 1️⃣ GET /admin/overview → Fetch Dashboard Overview Metrics
const get_admin_overview = async (req, res) => {
    try {
        const total_jobs = await Job.countDocuments();
        const total_subscriptions = await Subscription.countDocuments();
        const registered_candidates = await User.countDocuments({ role: 'candidate' });
        const total_companies = await Company.countDocuments();
        
        // ✅ Fetch Visitors by Platform
        const visitor_data = await Visitor.aggregate([
            { 
                $group: { 
                    _id: "$platform", 
                    total_visitors: { $sum: "$count" } 
                } 
            }
        ]);

        // ✅ Transform visitor data into key-value pairs
        let total_visitors = {
            "First Platform": 0,
            "Second Platform": 0,
            "Aggregate Store": 0
        };
        visitor_data.forEach(item => {
            total_visitors[item._id] = item.total_visitors;
        });

        const revenue_percentage = 93; // Static for now

        return responseHandler(res, 200, "Admin Overview", {
            total_jobs,
            total_subscriptions,
            registered_candidates,
            total_companies,
            revenue_percentage,
            total_visitors
        });
    } catch (err) {
        return responseHandler(res, 500, "Server Error", { error: err.message });
    }
};

// ✅ 2️⃣ GET /admin/department-distribution → Fetch Recruiter Department Distribution
const get_department_distribution = async (req, res) => {
    try {
        const department_distribution = await User.aggregate([
            { $match: { role: 'recruiter' } },
            { $group: { _id: "$department", count: { $sum: 1 } } }
        ]);

        // ✅ Convert to percentage
        const total_recruiters = department_distribution.reduce((acc, item) => acc + item.count, 0);
        const department_data = department_distribution.map(item => ({
            department: item._id,
            percentage: ((item.count / total_recruiters) * 100).toFixed(2) + "%"
        }));

        return responseHandler(res, 200, "Department Distribution", { department_data });
    } catch (err) {
        return responseHandler(res, 500, "Server Error", { error: err.message });
    }
};

module.exports = {
    get_admin_overview,
    get_department_distribution
};
