const mongoose = require('mongoose');

const admin_schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin'] }
}, { timestamps: true });

const Admin = mongoose.model('Admin', admin_schema);
module.exports = Admin;  
