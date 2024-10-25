import express from 'express';
import { addTransaction, getTransactionByDay } from '../controllers/Transaction.js';

const router = express.Router();

router.post('/addTransaction', addTransaction);
router.get('/getTransaction/:id/:day', getTransactionByDay);

export default router;