import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import taskRoutes from './routes/task-routes';
import requestLogger from './middleware/request-logger';
import { errorHandler } from './middleware/error-handler';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/tasks', taskRoutes);

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});