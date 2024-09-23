import express from 'express';
import { getTask, addTask } from '../controllers/Task.js';
const router = express.Router();

router.post('/addTask', addTask);
router.get('/getTasks/:id', getTask); 

export default router;