import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

// add transaction to DB
export const addTransaction = async (req, res) => {
    const { user, type, category, amount, description } = req.body;

    try {
        const newTransaction = new Transaction({
            user,
            type,
            category,
            amount,
            description
        });
        console.log(`New transaction: ${newTransaction}`);
        await newTransaction.save();
        console.log('New transaction has been saved into DB!');
        return res.status(201).json({
            message: 'Add transaction successfully!',
            transaction: newTransaction
        });

    } catch (error) {
        console.error("Error ", error);
        return res.status(500).send("Error adding transaction!");
    }
};

// get transaction by day from DB
export const getTransactionByDay = async (req, res) => {
    const userID = req.params.id;
    console.log(userID);
    const dayString = req.params.day;
    console.log(dayString);

    try {
        // Chuyển đổi dayString thành một đối tượng Date
        const startOfDay = new Date(dayString);
        const endOfDay = new Date(dayString);
        endOfDay.setHours(23, 59, 59, 999); // Đặt thời gian kết thúc của ngày

        // Chuyển đổi sang UTC
        const utcStartOfDay = new Date(startOfDay.toUTCString());
        const utcEndOfDay = new Date(endOfDay.toUTCString());

        console.log(`Start day: ${utcStartOfDay}`);
        console.log(`End day: ${utcStartOfDay}`);
        
        // Tìm các giao dịch của user trong ngày cụ thể
        const transactions = await Transaction.find({
            user: userID,
            createdAt: {
                $gte: utcStartOfDay,
                $lt: utcEndOfDay
            }
        });
        console.log(`Transactions found: ${transactions}`);
        // Kiểm tra nếu không có giao dịch nào
        if (transactions.length === 0) {
            return res.status(404).send("This user doesn't have any transactions on this day!");
        }

        // Gửi danh sách giao dịch
        return res.status(200).json({
            message: 'Transactions retrieved successfully!',
            transactions: transactions
        });

    } catch (error) {
        console.error("Error fetching transactions by day: ", error);
        return res.status(500).send("Error retrieving transactions!");
    }
};

// find transaction by id and delete from DB
export const deleteTransaction = async (req, res) => {
    const transactionID = req.params.id;

    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionID);
        console.log(`Deleted Transaction found: ${deleteTransaction}`);
        if(!deleteTransaction) {
            return res.status(404).send('Transaction not found!');
        }
        return res.status(200).send(`Transaction delete successfully!`);
    } catch (error) {
        console.error('Error delete task:', error);
        return res.status(500).message('Error deleting transaction!');
    }
};

// find transaction by id and edit it then save to DB
export const editTransaction = async (req, res) => {
    const transactionID = req.params.id;
    const { type, category, amount, description } = req.body;
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transactionID,
            { type, category, amount, description },
            {new: true}
        );
        if(!updatedTransaction){
            return res.status(404).send('Transaction not found');
        }
        console.log(`Updated Transaction found: ${updatedTransaction}`);
        return res.status(200).json({message: 'Update transaction successfully!', updatedTransaction});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Error updating transaction!');
    }
};