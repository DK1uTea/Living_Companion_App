import express from 'express';
import { getTask, addTask, editTask, deleteTask, markTaskAsCompleted } from '../controllers/Task.js';
const router = express.Router();

router.post('/addTask', addTask);
router.get('/getTasks/:id', getTask); 
router.put('/editTask/:id', editTask);
router.delete('/deleteTask/:id', deleteTask);
router.put('/markTaskAsCompleted/:id', markTaskAsCompleted);

export default router;