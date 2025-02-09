const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connect_db = require('./database/db');

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
    console.error('❌ ERROR: Missing MONGO_URI in environment variables');
    process.exit(1);
}

// Initialize Express app
const app = express();

// Connect to the database
connect_db();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for frontend communication
app.use(helmet()); // Security middleware to prevent vulnerabilities
app.use(morgan('dev')); // Logger for debugging

// Import Routes (directly from the routes folder)
const admin_auth_routes = require('./routes/admin_auth_routes');
const admin_dashboard_routes = require('./routes/admin_dashboard_routes');
const manage_recruiters_routes = require('./routes/manage_recruiters_routes');
const team_routes = require('./routes/team_routes');

// API Routes
app.use('/api/admin/auth', admin_auth_routes); // Admin Authentication APIs
app.use('/api/admin/dashboard', admin_dashboard_routes); // Admin Dashboard APIs
app.use('/api/admin/recruiters', manage_recruiters_routes); // Recruiter Management APIs
app.use('/api/admin/team', team_routes); // Team Management APIs

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Admin API is running successfully!' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ ERROR:', err.stack);

    if (err.errors) {
        return res.status(400).json({ success: false, errors: err.errors });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Graceful Shutdown
process.on('SIGINT', () => {
    console.log('🔻 Gracefully shutting down...');
    process.exit(0);
});
