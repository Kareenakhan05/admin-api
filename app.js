import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import admin_routes from './routes/admin_routes.js'; // Only admin routes are needed

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/admin', admin_routes); // Admin Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
