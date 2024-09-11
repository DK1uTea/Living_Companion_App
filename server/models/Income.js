import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    }, 
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Income = mongoose.model('Income', incomeSchema);
export default Income;