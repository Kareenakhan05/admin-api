const Recruiter = require('../models/user'); 
const responseHelper = require('../helpers/response_helpers');

// ✅ GET: Fetch list of recruiters with pagination, filtering, sorting
const get_recruiters = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status } = req.query;
        const filters = { role: 'recruiter' }; // Only fetch recruiter users

        if (search) {
            filters.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (status) {
            filters.status = status; // Filter by active/inactive status
        }

        const total_count = await Recruiter.countDocuments(filters);
        const recruiters = await Recruiter.find(filters)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        return responseHelper.success(res, {
            total_count,
            page,
            limit,
            recruiters
        });
    } catch (error) {
        return responseHelper.error(res, error.message);
    }
};

// ✅ PUT: Approve Recruiter
const approve_recruiter = async (req, res) => {
    try {
        const { id } = req.params;

        const recruiter = await Recruiter.findByIdAndUpdate(
            id,
            { status: 'active' },
            { new: true }
        );

        if (!recruiter) {
            return responseHelper.not_found(res, 'Recruiter not found');
        }

        return responseHelper.success(res, recruiter, 'Recruiter approved successfully');
    } catch (error) {
        return responseHelper.error(res, error.message);
    }
};

// ✅ PUT: Reject Recruiter
const reject_recruiter = async (req, res) => {
    try {
        const { id } = req.params;

        const recruiter = await Recruiter.findByIdAndUpdate(
            id,
            { status: 'inactive' },
            { new: true }
        );

        if (!recruiter) {
            return responseHelper.not_found(res, 'Recruiter not found');
        }

        return responseHelper.success(res, recruiter, 'Recruiter rejected successfully');
    } catch (error) {
        return responseHelper.error(res, error.message);
    }
};

// ✅ DELETE: Delete Recruiter
const delete_recruiter = async (req, res) => {
    try {
        const { id } = req.params;

        const recruiter = await Recruiter.findByIdAndDelete(id);

        if (!recruiter) {
            return responseHelper.not_found(res, 'Recruiter not found');
        }

        return responseHelper.success(res, {}, 'Recruiter deleted successfully');
    } catch (error) {
        return responseHelper.error(res, error.message);
    }
};

// ✅ GET: Get Recruiter Details
const get_recruiter_details = async (req, res) => {
    try {
        const { id } = req.params;
        const recruiter = await Recruiter.findById(id);

        if (!recruiter) {
            return responseHelper.not_found(res, 'Recruiter not found');
        }

        return responseHelper.success(res, recruiter);
    } catch (error) {
        return responseHelper.error(res, error.message);
    }
};

// ✅ Export all functions using `module.exports = {}` approach
module.exports = {
    get_recruiters,
    approve_recruiter,
    reject_recruiter,
    delete_recruiter,
    get_recruiter_details
};
