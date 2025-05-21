import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const blog = new Blog({
      title,
      description,
      image,
      user: req.user.id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error creating blog" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};



export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const updateData = {
      title,
      description,
      image,
    };

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error updating blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blog' });
  }
};

export const publicBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};