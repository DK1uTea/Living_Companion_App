import express from 'express';
import { addTransaction, deleteTransaction, editTransaction, getTransactionByDay } from '../controllers/Transaction.js';

const router = express.Router();

router.post('/addTransaction', addTransaction);
router.get('/getTransaction/:id/:day', getTransactionByDay);
router.delete('/deleteTransaction/:id', deleteTransaction);
router.put('/editTransaction/:id', editTransaction);

export default router;