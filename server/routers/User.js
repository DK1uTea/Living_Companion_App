import express from 'express';
import {loginUser, registerUser, socialLogin} from '../controllers/User.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/social-login', socialLogin);

export default router;