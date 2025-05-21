import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        alert("Session expired or invalid. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5 d-flex justify-content-between align-items-center">
      <div>
        <h2>Welcome, {user.email}</h2>
        <p>This is your dashboard.</p>
      </div>
      <div>
        <img
          src={`http://localhost:5000/${user.image}`}
          alt="Profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
