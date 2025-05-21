import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch blog details");
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <Link to="/blogs" className="btn btn-secondary mb-3">
        ← Back to Blogs
      </Link>
      <h2>{blog.title}</h2>
      <img
        src={blog.image}
        alt="Blog"
        className="img-fluid mb-3"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
