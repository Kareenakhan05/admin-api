const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./database/db.js');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for frontend communication
app.use(helmet()); // Security middleware to prevent vulnerabilities
app.use(morgan('dev')); // Logger for debugging

// Import Routes
const admin_auth_routes = require('./routes/admin_auth_routes.js');
const admin_dashboard_routes = require('./routes/admin_dashboard_routes.js'); 
const manage_recruiter_routes = require('./routes/manage_recruiters_routes.js'); // Import Recruiter Management Routes

// API Routes
app.use('/api/admin', admin_auth_routes); // Admin Authentication APIs
app.use('/api/admin/dashboard', admin_dashboard_routes); // Admin Dashboard APIs
app.use('/api/admin/recruiters', manage_recruiter_routes); // Recruiter Management APIs

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Admin API is running successfully!' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // If validation errors exist, return them
    if (err.errors) {
        return res.status(400).json({ success: false, errors: err.errors });
    }

    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
