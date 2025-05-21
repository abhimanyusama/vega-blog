import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    profileImage: "", // Now storing image URL as string
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(form); // Send form as JSON (not FormData)
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex align-items-center">
        <div className="col-md-4 mx-auto p-3 border rounded-3 justify-content-center">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Profile Image URL</label>
              <input
                type="text"
                name="profileImage"
                placeholder="https://example.com/image.jpg"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-primary w-100 my-3" type="submit">
              Sign Up
            </button>
          </form>

          <div className="text-center">
            <p className="mt-2">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
