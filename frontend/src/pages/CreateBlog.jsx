import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "", // now a string (URL)
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, image } = form;
    if (!title || !description || !image) {
      alert("Please fill all fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not authenticated.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/blogs",
        { title, description, image }, // sending plain JSON
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create blog.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            className="form-control"
            rows="5"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter blog description"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Blog
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
