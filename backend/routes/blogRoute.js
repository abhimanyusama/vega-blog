import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createBlog);
router.get("/", auth, getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;
