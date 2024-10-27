import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true,
    },
    category: {
        type: String,
        required: true, // Now required for both income and expense
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
