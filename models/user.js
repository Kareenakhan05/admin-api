import mongoose from 'mongoose';

const user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        default: null,
        trim: true
    },
    bio: {
        type: String,
        default: null,
        trim: true
    },
    skills: {
        type: [String],
        default: []
    },
    experience: {
        type: String,
        default: null,
        trim: true
    },
    qualification: {
        type: String,
        default: null,
        trim: true
    },
    resume: { // Stores resume file path or URL
        type: String,
        default: null
    },
    profile_picture: { // Stores profile picture path or URL
        type: String,
        default: null
    },
    role: { // Differentiates Job Seeker and Recruiter
        type: String,
        enum: ['job_seeker', 'recruiter', 'admin'],
        required: true
    },
    status: { // Approval status for recruiters
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const User = mongoose.model('User', user_schema);

export default User;
