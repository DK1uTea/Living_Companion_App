import express from 'express';
import { getTask } from '../controllers/Task.js';
const router = express.Router();

router.get('/tasks', getTask); 

export default router;