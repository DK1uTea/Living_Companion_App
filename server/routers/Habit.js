import express from 'express';
import { addHabit, getHabit, deleteHabit, editHabit, markHabitAsCompleted, getHabitCompletionStatistic } from '../controllers/Habit.js'
const router = express.Router();

router.get('/getHabit/:id', getHabit);
router.post('/addHabit', addHabit);
router.delete('/deleteHabit/:id', deleteHabit);
router.put('/editHabit/:id', editHabit);
router.put('/markHabitAsCompleted/:id', markHabitAsCompleted);
router.get('/habitStats/:userID', getHabitCompletionStatistic);

export default router;