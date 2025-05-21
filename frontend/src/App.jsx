import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import EditBlog if you're using it later

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        {/* <Route path="/edit-blog/:id" element={<EditBlog />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
