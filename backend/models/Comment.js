import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
