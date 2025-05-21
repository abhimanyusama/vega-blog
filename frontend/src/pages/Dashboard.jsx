import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load blogs.");
      }
    };

    fetchProfile();
    fetchBlogs();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Blog deleted.");
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  if (!user) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Welcome, {user.email}</h2>
          <p>This is your dashboard.</p>
        </div>
        <div>
          <img
            src={user.profileImage}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
      </div>

      {/* Create Blog Button */}
      <div className="mb-3 text-end">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/create-blog")}
        >
          Create Blog
        </button>
      </div>

      {/* Blog List */}
      <h4>Your Blogs</h4>
      <table className="table table-bordered table-hover mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>
                <img
                  src={`http://localhost:5000/${blog.image}`}
                  alt="Blog"
                  style={{ width: "100px" }}
                />
              </td>
              <td>{blog.description.slice(0, 100)}...</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/edit-blog/${blog._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!blogs.length && (
            <tr>
              <td colSpan="4" className="text-center">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
