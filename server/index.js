import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Task from './routers/Task.js';
import User from './routers/User.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

// Connect to MongoDB
connectDB();

// routers
app.use('/api', Task);
app.use('/api', User);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});