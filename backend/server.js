import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoute.js';
import blogRoutes from './routes/blogRoute.js';
import commentRoutes from './routes/commentRoute.js';  

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);  

mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(5000, () => console.log('Server running on port 5000')))
.catch(err => console.log(err));
