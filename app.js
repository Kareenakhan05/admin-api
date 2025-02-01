import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import admin_routes from './routes/admin_routes.js'; // Admin routes

dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // To parse JSON request bodies

// API Routes
app.use('/api/admin', admin_routes); // All admin-related routes

// Health Check Route (Optional - to verify the server is running)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Admin API is running successfully!' });
});

// Error Handling Middleware (Optional - to handle any server errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
