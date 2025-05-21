import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs/publicBlogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">All Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div
              className="card h-100"
              onClick={() => navigate(`/blogs/${blog._id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={blog.image}
                className="card-img-top"
                alt="Blog"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.description.slice(0, 100)}...</p>
              </div>
            </div>
          </div>
        ))}
        {!blogs.length && (
          <p className="text-center">No blogs available to display.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
