import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { signup, login, getProfile } from '../controllers/authController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', upload.single('profileImage'), signup);
router.post('/login', login);
router.get('/profile', auth, getProfile);

export default router;
