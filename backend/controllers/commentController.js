import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  try {
    const { text, blogId, parentId } = req.body;

    const comment = new Comment({
      content: text,
      blog: blogId,
      user: req.user.id,
      parent: parentId || null,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};

export const getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate('user', 'email')
      .lean();

    
    const commentMap = {};
    const topLevelComments = [];

    comments.forEach(comment => {
      comment.replies = [];
      commentMap[comment._id] = comment;

      if (comment.parent) {
        commentMap[comment.parent]?.replies.push(comment);
      } else {
        topLevelComments.push(comment);
      }
    });

    res.status(200).json(topLevelComments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};
