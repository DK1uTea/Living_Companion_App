import express from 'express';
import { addHabit, getHabit, deleteHabit, editHabit } from '../controllers/Habit.js'
const router = express.Router();

router.get('/getHabit/:id', getHabit);
router.post('/addHabit', addHabit);
router.delete('/deleteHabit/:id', deleteHabit);
router.put('/editHabit/:id', editHabit);

export default router;