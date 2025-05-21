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
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("this is the result", res);
        setUser(res.data);
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
          src={user.profileImage}
          alt="Profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
