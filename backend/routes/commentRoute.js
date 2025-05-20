import express from 'express';
import { addComment, getCommentsByBlog } from '../controllers/commentController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, addComment);
router.get('/:blogId', getCommentsByBlog);

export default router;
