const mongoose = require('mongoose');

const job_schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Job description is required'],
            trim: true
        },
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true
        },
        location: {
            type: String,
            required: [true, 'Job location is required'],
            trim: true
        },
        salary_range: {
            type: String,
            trim: true
        },
        job_type: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
            required: [true, 'Job type is required']
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Assuming recruiters are users
            required: true
        }
    },
    { timestamps: true } // ✅ Automatically adds createdAt and updatedAt fields
);

// Export the Job model using CommonJS
module.exports = mongoose.model('Job', job_schema);
