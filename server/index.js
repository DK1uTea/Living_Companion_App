import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Task from './routers/Task.js';
import User from './routers/User.js';
import Transaction from './routers/Transaction.js';
import Habit from './routers/Habit.js'

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
app.use('/api', User);
app.use('/api', Task);
app.use('/api', Transaction);
app.use('/api', Habit);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});