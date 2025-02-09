const mongoose = require('mongoose');

const team_schema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, enum: ['HR', 'Tech', 'Design', 'Operations'], required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('team', team_schema);
