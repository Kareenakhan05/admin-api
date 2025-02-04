const User = require('../../models/user.js');
const Job = require('../../models/job.js');
const Application = require('../../models/application.js');
const { send_response } = require('../../helpers/responseHelper.js');

// Get Dashboard Stats (User & Recruiter)
const get_dashboard_stats = async (req, res) => {
    try {
        const total_users = await User.countDocuments();
        const total_recruiters = await User.countDocuments({ role: 'recruiter' });
        const pending_recruiters = await User.countDocuments({ role: 'recruiter', status: 'pending' });
        const total_jobs = await Job.countDocuments();

        const dashboard_data = {
            total_users,
            total_recruiters,
            pending_recruiters,
            total_jobs,
        };

        send_response(res, 200, 'Admin dashboard data', dashboard_data);
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
};

// Get Job Portal Dashboard Stats
const get_job_dashboard_stats = async (req, res) => {
    try {
        const total_jobs = await Job.countDocuments();
        const active_jobs = await Job.countDocuments({ status: 'active' });
        const closed_jobs = await Job.countDocuments({ status: 'closed' });
        const pending_applications = await Application.countDocuments({ status: 'pending' });

        const job_dashboard_data = {
            total_jobs,
            active_jobs,
            closed_jobs,
            pending_applications,
        };

        send_response(res, 200, 'Job portal dashboard data', job_dashboard_data);
    } catch (err) {
        send_response(res, 500, 'Server error', err.message);
    }
};

// Export the controller functions
module.exports = {
    get_dashboard_stats,
    get_job_dashboard_stats
};
