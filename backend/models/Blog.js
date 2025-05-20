import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });



export default mongoose.model('Blog', blogSchema);