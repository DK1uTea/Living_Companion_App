import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'daily',
    },
    targetCount: {
        type: Number, // e.g., How many times per week
        default: 1,
    },
    completedDates: {
        types: [Date], // Array of dates when the habit was completed
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Habit = mongoose.model('Habit', habitSchema);
export default Habit;